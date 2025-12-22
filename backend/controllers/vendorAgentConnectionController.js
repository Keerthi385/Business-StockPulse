import Agent from "../models/Agent.js";
import Vendor from "../models/Vendor.js";
import Connection from "../models/Connection.js";

export const createConnectionRequest = async (req, res) => {
  try {
    const vendorId = req.vendor.vendorId;
    const agentID = req.params.agentID;
    const vendor = await Vendor.findById( vendorId );
    const agent = await Agent.findOne({ agentID });

    const connectionExists = await Connection.findOne({
      agentID,
      vendorID: vendor.vendorID,
    });

    if(connectionExists) return res.status(409).json({message: "Connection already exists!"});

    console.log(agent);
    const connection = new Connection({
      vendorID: vendor.vendorID,
      vendorName: vendor.vendorName,
      vendorShopName: vendor.vendorShopName,
      agentID,
      agentName: agent.agentName,
      agencyName: agent.agencyName,
      connectionStatus: "pending",
    });

    const newConnection = await connection.save();

    return res
      .status(201)
      .json({ message: "Connection created successfully!", newConnection });
  } catch (error) {
    console.log("Error in createConnectionRequest", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  try {
    const agentId = req.agent.agentId;
    const connectionId = req.params.connectionId;

    const agent = await Agent.findById(agentId);

    if (!connectionId) {
      return res.status(400).json({ message: "connectionID is required" });
    }

    const connection = await Connection.findById(connectionId);
    console.log(agent);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    if (connection.agentID !== agent.agentID) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this request" });
    }

    connection.connectionStatus = "accepted";
    const updatedConnection = await connection.save();

    return res.status(200).json({
      message: "Connection request accepted successfully!",
      updatedConnection,
    });
  } catch (error) {
    console.log("Error in acceptConnectionRequest", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectConnectionRequest = async(req,res) => {
  try {
    const agentId = req.agent.agentId;
    const connectionId = req.params.connectionId;

    const agent = await Agent.findById(agentId);

    if (!connectionId) {
      return res.status(400).json({ message: "connectionID is required" });
    }

    const connection = await Connection.findById(connectionId);
    console.log(agent);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }

    if (connection.agentID !== agent.agentID) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this request" });
    }

    connection.connectionStatus = "rejected";

    const updatedConnection = await connection.save();

    //await Connection.findByIdAndDelete(connection._id);

    return res.status(200).json({
      message: "Connection request accepted successfully!",
      updatedConnection,
    });
  } catch (error) {
    console.log("Error in acceptConnectionRequest", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const viewConnectedAgents = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor.vendorId);
    const agents = await Connection.find({ vendorID: vendor.vendorID });

    return res.status(200).json(agents);
  } catch (error) {
    console.log("Error in viewConnectedAgents", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const viewConnectedVendors = async(req,res) => {
  try {
    const agent = await Agent.findById(req.agent.agentId);
    const vendors = await Connection.find({ agentID: agent.agentID, connectionStatus: "accepted" });

    return res.status(200).json(vendors);
  } catch (error) {
    console.log("Error in viewConnectedAgents", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const findAgentByID = async(req,res) => {
  try {
    const agentID = req.params.id;
    const agent = await Agent.findOne({agentID});
    if(!agent) return res.status(404).json({message: "No agent found with provided ID"});
    return res.status(200).json(agent);
  } catch (error) {
    console.log("Error in findAgentByID", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const viewConnectionRequests = async(req,res) => {
  try {
    const agent = await Agent.findById(req.agent.agentId);
    const requests = await Connection.find({agentID: agent.agentID, connectionStatus: "pending"});
    return res.status(200).json(requests);
  } catch (error) {
    console.log("Error in viewConnectionRequests", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteConnection = async(req, res) => {
  try {
    const connection = await Connection.findByIdAndDelete(req.params.connectionId);
    if(!connection) return res.status(404).json({message: "Connection does not exist!"});

    return res.status(200).json({message: "Connection deleted successfully!"});
  } catch (error) {
    console.log("Error in deleteConnection", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}