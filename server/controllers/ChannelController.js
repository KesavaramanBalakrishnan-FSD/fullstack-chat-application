import User from "../models/User.js";
import Channel from "../models/Channel.js";
import mongoose from "mongoose";

export const createChannel = async (req, res) => {
  try {
    const { name, members } = req.body;

    const userId = req.userId;
    const admin = await User.findById(userId);

    if (!admin) {
      return res.status(400).send("Admin User not found");
    }

    const ValidMembers = await User.find({
      _id: {
        $in: members,
      },
    });

    if (ValidMembers.length !== members.length) {
      return res
        .status(400)
        .send("Some of the provided member are not valid members.");
    }

    const newChannel = new Channel({
      name,
      members: [...members, userId],
      admin: userId,
    });

    await newChannel.save();
    res.status(201).json({ channel: newChannel });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserChannels = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const channels = await Channel.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updated: -1 });

    res.status(200).json({ channels });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;

    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName email _id image color",
      },
    });

    if (!channel) {
      return res.status(404).send("Channel not found");
    }

    const messages = channel.messages;

    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
