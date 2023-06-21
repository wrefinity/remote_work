import Message from "../models/messages.js";
import Interact from "../models/interactions.js";


class MessageRepo {
  createMessage = async (req, res, next) => {
    try {

      console.log(req.body)
      const createdMessage = await Message.create({
        interactionId: req.body.interactionId,
        userId: req.userId,
        message: req.body.desc,
      });
      await Interact.findOneAndUpdate(
        { id: req.body.interactionId },
        {
          $set: {
            readBySeller: req.isSeller,
            readByBuyer: !req.isSeller,
            lastMessage: req.body.desc,
          },
        },
        { new: true }
      );

      res.status(201).send(createdMessage);
    } catch (err) {
      // console.log(err)
      // next(err);
    }
  };
  getMessages = async (req, res, next) => {
    try {
      const messages = await Message.find({ interactionId: req.params.id })
        .populate({ path: 'userId', select: ['username', 'image', '_id'] })
        .exec();
      res.status(200).send(messages);
    } catch (err) {
      res.status(200).json("waiting ")
    }
  };

}


export default new MessageRepo()
