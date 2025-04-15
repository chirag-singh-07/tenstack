import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app = express();
const PORT  = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // your client origin
  credentials: true, // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 