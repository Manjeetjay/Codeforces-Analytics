# CodeMetrics - Competitive Programming Analytics Platform

A full-stack web application that provides comprehensive analytics and visualizations for Codeforces competitive programmers. Get real-time insights into your performance, rating trends, problem-solving patterns, and submission history.

## 🚀 Features

- **Real-Time Performance Insights**
  - Current and maximum rating
  - Problems solved count
  - Global and country ranking
  - Contribution and friend statistics

- **Interactive Visualizations**
  - Rating history chart with contest details
  - Problems solved by difficulty level
  - Top problem tags distribution
  - Acceptance rate analytics

- **Comprehensive Dashboard**
  - User profile with avatar and rank badges
  - Recent submissions table
  - Color-coded verdicts and ratings
  - Responsive design for all devices

- **Professional UI/UX**
  - Modern dark theme with glassmorphism
  - Smooth animations and transitions
  - Clean, intuitive interface
  - Mobile-friendly responsive design

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.2.0** - Java framework
- **PostgreSQL** - Database
- **Spring Data JPA** - ORM
- **Spring Cache** - Caching layer
- **Maven** - Build tool

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Vanilla CSS** - Styling

## 📋 Prerequisites

- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **PostgreSQL 15+** (database)
- **Maven** (for backend build)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
cd M:/projects/codeforces
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE codemetrics;
```

Update database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/codemetrics
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Backend Setup

```bash
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🎯 Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a Codeforces handle (e.g., "tourist", "Petr", "Benq")
3. Click "Analyze Performance"
4. View comprehensive analytics and visualizations

## 📊 API Endpoints

### User Endpoints

- `GET /api/users/{handle}` - Get user statistics
- `GET /api/users/{handle}/rating-history` - Get rating history
- `GET /api/users/{handle}/problem-stats` - Get problem statistics
- `GET /api/users/{handle}/submissions` - Get recent submissions

### Response Examples

**User Stats:**
```json
{
  "handle": "tourist",
  "rating": 3858,
  "maxRating": 4229,
  "rank": "legendary grandmaster",
  "maxRank": "legendary grandmaster",
  "country": "Belarus",
  "problemsSolved": 2500
}
```

## 🏗️ Project Structure

```
codeforces/
├── backend/
│   └── src/main/java/com/codemetrics/
│       ├── config/          # Configuration classes
│       ├── controller/      # REST controllers
│       ├── dto/            # Data transfer objects
│       ├── exception/      # Exception handlers
│       ├── model/          # JPA entities
│       ├── repository/     # Data repositories
│       └── service/        # Business logic
│
└── frontend/
    └── src/
        ├── components/     # React components
        ├── pages/         # Page components
        ├── services/      # API services
        └── utils/         # Helper functions
```

## 🎨 Design Features

- **Professional Dark Theme** - Easy on the eyes for long coding sessions
- **Rank-Based Color Coding** - Visual distinction for different rating levels
- **Responsive Grid Layout** - Adapts to all screen sizes
- **Interactive Charts** - Hover tooltips and smooth animations
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages

## 🔒 Features & Optimizations

- **API Caching** - Reduces load on Codeforces API
- **Rate Limiting** - Prevents API abuse
- **Database Indexing** - Fast query performance
- **Lazy Loading** - Optimized data fetching
- **Error Recovery** - Graceful degradation

## 🚀 Future Enhancements

- [ ] Multi-platform support (LeetCode, AtCoder, HackerRank)
- [ ] User authentication and saved profiles
- [ ] Comparison between multiple users
- [ ] ML-based performance predictions
- [ ] Contest calendar integration
- [ ] Email notifications for rating changes
- [ ] Export analytics as PDF/CSV

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for the competitive programming community

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, please open an issue in the repository.

---

**Note:** This application uses the official Codeforces API. Please ensure you comply with their API usage guidelines and rate limits.
