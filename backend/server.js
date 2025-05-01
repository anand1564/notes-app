const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRouter');
const groupRoutes = require('./routes/groupRouter');
const subjectRoutes = require('./routes/subjectRouter');
const noteRoutes = require('./routes/notesRouter');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
  }));
  

app.use("/uploads", express.static("uploads"));

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use('/api/groups', groupRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/auth',userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});