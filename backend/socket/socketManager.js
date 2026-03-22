const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Patient joins their own room
    socket.on("join_patient_room", (patientId) => {
      socket.join(`patient_${patientId}`);
      console.log(`Patient joined room: patient_${patientId}`);
    });

    // Caregiver joins their own room
    socket.on("join_caregiver_room", (caregiverId) => {
      socket.join(`caregiver_${caregiverId}`);
      console.log(`Caregiver joined room: caregiver_${caregiverId}`);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export { initSocket };