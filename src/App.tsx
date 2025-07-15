import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/Blogs/BlogList";
import BlogCreate from "./pages/Blogs/BlogCreate";
import BlogEdit from "./pages/Blogs/BlogEdit";
import Gallery from "./pages/Gallery";
import Pages from "./pages/Pages/List";
import Login from "./pages/Auth/Login";
import PageCreate from './pages/Pages/PageCreate';
import HomeTemplate from './pages/Pages/Home/HomeTemplate';
import AboutTemplate from './pages/Pages/About/AboutTemplate';
import SeoCreate from './pages/Seo/SeoCreate';
import SeoUpdate from './pages/Seo/SeoUpdate';
import SeoList from './pages/Seo/SeoList';
import FaqList from './pages/faq/FaqList';
import FaqCreate from './pages/faq/FaqCreate';
import FaqEdit from './pages/faq/FaqEdit';
import '../src/App.css';
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import PageForm from "./pages/Pages/Common/OurTours";
import { useParams } from "react-router-dom";
import PageFormWithGallery from "./pages/Pages/Common/OurToursImagesPage";
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const slug = useParams();
  console.log("slug", slug);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const exception = [
    'pages/napa-valley-wine-tour',
    'pages/napa-valley-wine-tour',
    'pages/russian-river-wine-tours',
    'pages/dry-creek-wine-tours'
  ];
  const fullPath = `${slug["*"] || ""}`;
  console.log("fullPath", fullPath);
  return (
    <AppLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="account-settings" element={<AccountSettings />} />
        <Route path="blogs" element={<BlogList />} />
        <Route path="blogs/create" element={<BlogCreate />} />
        <Route path="blogs/edit/:id" element={<BlogEdit />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="pages" >
          <Route index element={<Pages />} />
          <Route path="create" element={<PageCreate />} />
          <Route path="home" element={<HomeTemplate />} />
          <Route path="about" element={<AboutTemplate />} />
          <Route path=":slug" element={(exception?.includes(fullPath)) ? <PageFormWithGallery title="Edit Page"/> : <PageForm title="Edit Page" />} />
        </Route>
        <Route path="seo" >
          <Route index element={<SeoList />} />
          <Route path="create" element={<SeoCreate />} />
          <Route path=":id" element={<SeoUpdate />} />
        </Route>
        <Route path="faq" >
          <Route index element={<FaqList />} />
          <Route path="create" element={<FaqCreate />} />
          <Route path=":id" element={<FaqEdit />} />
        </Route>
      </Routes>
    </AppLayout>
  );
};

const App: React.FC = () => {
    const base = process.env.NODE_ENV === "production" ? "/admin" : "/";
  return (
    <Router basename={base}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
};

export default App;
