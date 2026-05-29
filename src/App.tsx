import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';

const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CareerExplorer = lazy(() => import('./pages/CareerExplorer'));
const CareerDetail = lazy(() => import('./pages/CareerDetail'));
const Quiz = lazy(() => import('./pages/Quiz'));
const QuizResults = lazy(() => import('./pages/QuizResults'));
const SavedCareers = lazy(() => import('./pages/SavedCareers'));
const Compare = lazy(() => import('./pages/Compare'));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<CareerExplorer />} />
          <Route path="/career/:slug" element={<CareerDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/results" element={<QuizResults />} />
          <Route path="/saved" element={<SavedCareers />} />
          <Route path="/compare" element={<Compare />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
