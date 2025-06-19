import WorkOut from "../models/WorkOut.js";

export const addWorkOut = async (req, res) => {
  try {
    const { name, duration } = req.body;
    const userId = req.user.id;
    if (!name || !duration) {
      return res.status(400).json({ error: `name and duration is required` });
    }
    const existingWorkOut = await WorkOut.findOne({ userId, name });
    if (existingWorkOut) {
      return res.status(400).json({ error: `workout already exists` });
    }

    const newWorkout = new WorkOut({
      userId,
      name,
      duration,
    });
    await newWorkout.save();
    return res.status(201).json(newWorkout);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getWorkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const WorkOuts = await WorkOut.find({ userId }).select("-userId");
    if (WorkOuts.length == 0) {
      return res.status(404).json({ message: `no existing workout yet` });
    }
    return res.status(200).json({ workouts: WorkOuts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateWorkOut = async (req, res) => {
  try {
    const workOutId = req.params.id;
    const { name, duration, status } = req.body;
    const userId = req.user.id;

    const existingName = await WorkOut.findOne({ userId, name });
    if (existingName) {
      res.status(400).json({ error: `workout name already exists` });
    }

    const userWorkOuts = await WorkOut.find({ userId });
    if (userWorkOuts.length == 0) {
      return res.status(404).json({ message: `no workouts to update` });
    }

    const workOut = await WorkOut.findById(workOutId);
    if (!workOut) {
      return res.status(404).json({ message: `workout not found` });
    }
    workOut.name = name || workOut.name;
    workOut.duration = duration || workOut.duration;
    workOut.status = status || workOut.status;
    await workOut.save();
    return res.status(200).json({ message: `workout successfully updated`, updatedWorkout: workOut });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteWorkOut = async (req, res) => {
  try {
    const workOutId = req.params.id;
    const userId = req.user.id;

    const userWorkOuts = await WorkOut.find({ userId });
    if (userWorkOuts.length == 0) {
      return res.status(404).json({ message: `no workouts to delete` });
    }

    const workOut = await WorkOut.findOneAndDelete({ userId, _id: workOutId });
    if (!workOut) {
      return res.status(404).json({ message: `workout not found` });
    }
    return res.status(200).json({ message: `workout successfully deleted` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const completeWorkOutStatus = async (req, res) => {
  try {
    const workOutId = req.params.id;
    const userId = req.user.id;

    const userWorkOuts = await WorkOut.find({ userId });
    if (userWorkOuts.length == 0) {
      return res.status(404).json({ message: `no workouts to update` });
    }

    const workOut = await WorkOut.findOneAndUpdate({ userId, _id: workOutId }, { status: "completed" });
    if (!workOut) {
      return res.status(404).json({ message: `workout not found` });
    }
    return res.status(200).json({ message: `workout updated successfully`, updatedWorkout: workOut });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
