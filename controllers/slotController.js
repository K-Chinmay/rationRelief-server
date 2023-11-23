import Event from "../models/EventSchema.js";
import Slot from "../models/slotSchema.js";
import User from "../models/userSchema.js";
import { ObjectId } from "mongodb";

import { createError } from "../utils/error.js";

export const createSlot = async (req, res, next) => {
  const eventId = req.params.eventid;
  const newSlot = new Slot(req.body);
  try {
    const savedSlot = await newSlot.save();
    try {
      await Event.findByIdAndUpdate(eventId, {
        $push: { slots: savedSlot._id },
      });

      await Event.findByIdAndUpdate(
        { _id: new ObjectId(eventId) },
        [
          {
            $set: {
              rationDetails: {
                $map: {
                  input: "$rationDetails",
                  as: "item",
                  in: {
                    $mergeObjects: [
                      "$$item",
                      {
                        quantity: {
                          $cond: {
                            if: { $gte: ["$$item.quantity", 0] },
                            then: {
                              $subtract: [
                                "$$item.quantity",
                                "$$item.allocatedPerUser",
                              ],
                            },
                            else: 0,
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
        { new: true } // To return the updated document
      );
      await User.updateOne(
        { _id: req.body.userId },
        {
          $set: {
            isSlotBooked: true,
            slotId: savedSlot._id,
            eventId: savedSlot.eventid,
          },
        }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedSlot);
  } catch (err) {
    next(err);
  }
};

export const updateSlot = async (req, res, next) => {
  try {
    const updatedSlot = await Slot.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSlot);
  } catch (err) {
    next(err);
  }
};

export const updateSlotAvailability = async (req, res, next) => {
  try {
    await Slot.updateOne(
      { "slotNumbers._id": req.params.id },
      {
        $push: {
          "slotNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Slot status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteSlot = async (req, res, next) => {
  const eventId = req.params.eventid;
  try {
    await Slot.findByIdAndDelete(req.params.id);
    try {
      await Event.findByIdAndUpdate(eventId, {
        $pull: { slots: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Slot has been deleted.");
  } catch (err) {
    next(err);
  }
};

// export const createSlot = async (req, res, next) => {
//   const eventId = req.params.eventid;
//   const newSlot = new Slot(req.body);
//   try {
//     const savedSlot = await newSlot.save();
//     try {
//       await Event.findByIdAndUpdate(eventId, {
//         $push: { slots: savedSlot._id },
//       });

//       await Event.findByIdAndUpdate(
//         { _id: new ObjectId(eventId) },
//         [
//           {
//             $set: {
//               rationDetails: {
//                 $map: {
//                   input: "$rationDetails",
//                   as: "item",
//                   in: {
//                     $mergeObjects: [
//                       "$$item",
//                       {
//                         quantity: {
//                           $cond: {
//                             if: { $gte: ["$$item.quantity", 0] },
//                             then: {
//                               $subtract: [
//                                 "$$item.quantity",
//                                 "$$item.allocatedPerUser",
//                               ],
//                             },
//                             else: 0,
//                           },
//                         },
//                       },
//                     ],
//                   },
//                 },
//               },
//             },
//           },
//         ],
//         { new: true } // To return the updated document
//       );
//       await User.updateOne(
//         { _id: req.body.userId },
//         {
//           $set: {
//             isSlotBooked: true,
//             slotId: savedSlot._id,
//           },
//         }
//       );
//     } catch (err) {
//       next(err);
//     }
//     res.status(200).json(savedSlot);
//   } catch (err) {
//     next(err);
//   }
// };

export const getSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findById(req.params.id);
    res.status(200).json(slot);
  } catch (err) {
    next(err);
  }
};
export const getSlots = async (req, res, next) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (err) {
    next(err);
  }
};
