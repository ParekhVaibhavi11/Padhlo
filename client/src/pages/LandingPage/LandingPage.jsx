import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Users,
  MessageSquare,
  FileText,
  Calendar,
  Trophy,
  Flame,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  Menu,
  X,
  ListTodo,
  Share2,
  ShieldCheck,
  BarChart3,
  LogIn,
  UserPlus,
  LayoutDashboard,
  GraduationCap
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import studentsStudyingImg from "../../assets/students_studying.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is Padhlo completely free to use?",
      answer:
        "Yes, Padhlo is 100% free for students, study groups, and classrooms. You can create unlimited tasks, join classrooms, and share notes without any subscription fees.",
    },
    {
      question: "How do classroom room codes work?",
      answer:
        "When a classroom creator builds a study group, a unique room code is generated. Other members can simply type this code on their dashboard to join the classroom instantly.",
    },
    {
      question: "Where are shared notes and study materials stored?",
      answer:
        "Notes and study materials uploaded to classrooms are securely stored in cloud storage (Cloudinary) and linked directly to your classroom library for easy access anytime.",
    },
    {
      question: "How does the study streak system work?",
      answer:
        "Completing your study tasks on consecutive days automatically increments your daily study streak. Your streak is displayed on your personal profile and the global leaderboard.",
    },
    {
      question: "Is real-time chat available in every classroom?",
      answer:
        "Yes! Every classroom features built-in real-time chat powered by WebSockets (Socket.IO). Members can send messages, edit their posts, and delete messages instantly.",
    },
  ];

  const features = [
    {
      icon: <ListTodo className="w-6 h-6 text-purple-600" />,
      title: "Smart Task Management",
      description:
        "Organize daily study goals, set deadlines, track pending items, and check off completed tasks with ease.",
      badge: "Personal & Group",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      icon: <Users className="w-6 h-6 text-violet-600" />,
      title: "Collaborative Classrooms",
      description:
        "Create or join virtual study rooms using unique room codes. Assign member tasks and track group progress.",
      badge: "Teamwork",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      title: "Shared Notes & Materials",
      description:
        "Upload lecture notes, reference PDFs, and study resources so everyone in your classroom stays updated.",
      badge: "Cloud Storage",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-violet-600" />,
      title: "Real-Time Classroom Chat",
      description:
        "Instant group messaging powered by Socket.IO. Discuss assignments, edit messages, and clear doubts in real time.",
      badge: "Socket.IO Sync",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
      icon: <Calendar className="w-6 h-6 text-purple-600" />,
      title: "Interactive Study Calendar",
      description:
        "Schedule personal study sessions, log exam dates, and visualize task deadlines on a clean monthly calendar.",
      badge: "Schedule View",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      icon: <Trophy className="w-6 h-6 text-violet-600" />,
      title: "Leaderboard & Streak Tracking",
      description:
        "Maintain daily study streaks to climb global and classroom leaderboards. Stay consistent and motivated.",
      badge: "Gamified Study",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Register with your student details in seconds to set up your personal learning workspace.",
      icon: <UserPlus className="w-5 h-5 text-purple-600" />,
    },
    {
      number: "02",
      title: "Join or Create Classrooms",
      description:
        "Enter a room code or create a new classroom for your course or study group.",
      icon: <Users className="w-5 h-5 text-violet-600" />,
    },
    {
      number: "03",
      title: "Organize & Share Notes",
      description:
        "Add tasks, upload lecture notes, schedule events, and chat with peers in real time.",
      icon: <Share2 className="w-5 h-5 text-purple-600" />,
    },
    {
      number: "04",
      title: "Track & Excel",
      description:
        "Complete tasks daily, build your study streak, and watch your progress on the leaderboard.",
      icon: <BarChart3 className="w-5 h-5 text-violet-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-purple-100 selection:text-purple-900">
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg transition-transform group-hover:scale-105">
              P
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                Padhlo
              </span>
              <span className="text-xs text-slate-500 font-medium -mt-1">
                Learning Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-purple-600 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-purple-600 transition-colors">
              How It Works
            </a>
            <a href="#faq" className="hover:text-purple-600 transition-colors">
              FAQ
            </a>
            <a href="#about" className="hover:text-purple-600 transition-colors">
              About
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {token ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl text-purple-700 font-medium hover:bg-purple-50 transition flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-purple-50 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-purple-700" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
            <nav className="flex flex-col space-y-3 font-medium text-slate-700">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700"
              >
                How It Works
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700"
              >
                FAQ
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700"
              >
                About
              </a>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              {token ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/dashboard");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-purple-200 text-purple-700 font-medium hover:bg-purple-50"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium shadow-md"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-14 lg:py-20 bg-purple-50/40 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side Image: Students Studying at Home & Sharing Notes */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl p-3 bg-white border border-purple-100 shadow-xl overflow-hidden group">
                <img
                  src={studentsStudyingImg}
                  alt="Students studying at home and sharing notes on Padhlo"
                  className="w-full h-auto rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                
                {/* Overlay Badge 1 */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-purple-100 shadow-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Notes & PDF Shared</div>
                    <div className="text-[10px] text-purple-700 font-semibold">Cloud Sync Active</div>
                  </div>
                </div>

                {/* Overlay Badge 2 */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-purple-100 shadow-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Daily Study Streak</div>
                    <div className="text-[10px] text-emerald-700 font-semibold">5 Days Active</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-700 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Collaborative Learning Platform
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Study Smarter. <br />
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Stay Organized.
                </span>{" "}
                Learn Together.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Padhlo connects students with intelligent task tracking, real-time group classrooms, instant messaging, shared study notes, and streak leaderboards—all in one unified workspace.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 rounded-xl bg-white border border-purple-200 text-purple-700 font-semibold hover:bg-purple-50 transition shadow-sm flex items-center justify-center gap-2 text-base"
                >
                  Log In to Account
                </Link>
              </div>

              {/* Bullet Features */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-600 border-t border-purple-100">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Free for all students
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant classroom room codes
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Socket.IO chat
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Shared notes cloud storage
                </span>
              </div>
            </div>

          </div>

          {/* Interactive Dashboard UI Mockup Preview */}
          <div className="mt-16 max-w-5xl mx-auto rounded-2xl border border-purple-200 bg-white shadow-xl overflow-hidden">
            {/* Window Top Bar */}
            <div className="bg-purple-50/80 px-4 py-3 border-b border-purple-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
              </div>
              <div className="bg-white border border-purple-200 rounded-md px-4 py-1 text-xs text-purple-700 font-mono flex items-center gap-2 w-64 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                https://padhlo.app/dashboard
              </div>
              <div className="text-xs text-purple-600 font-medium">Dashboard Preview</div>
            </div>

            {/* Mockup Dashboard Content */}
            <div className="p-6 bg-slate-50 grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Mini Sidebar */}
              <div className="hidden md:block bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow">
                    P
                  </div>
                  <span className="font-bold text-slate-800 text-sm">Padhlo</span>
                </div>
                <div className="space-y-1 text-xs font-medium">
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center gap-2 font-semibold shadow">
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </div>
                  <div className="p-2.5 rounded-xl text-slate-600 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2">
                    <ListTodo className="w-4 h-4" /> Tasks
                  </div>
                  <div className="p-2.5 rounded-xl text-slate-600 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Classroom
                  </div>
                  <div className="p-2.5 rounded-xl text-slate-600 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Materials
                  </div>
                  <div className="p-2.5 rounded-xl text-slate-600 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Calendar
                  </div>
                  <div className="p-2.5 rounded-xl text-slate-600 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> Leaderboard
                  </div>
                </div>
              </div>

              {/* Main Content Preview */}
              <div className="md:col-span-3 space-y-6">
                {/* Header Welcome Banner */}
                <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Welcome back, Vaibhavi!</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Manage your study goals and track your progress.
                    </p>
                  </div>
                  <div className="px-3.5 py-1.5 bg-purple-50 border border-purple-200 text-purple-700 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-purple-600" />
                    5 Days Study Streak
                  </div>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="text-slate-500 text-xs font-medium">Tasks</div>
                    <div className="text-xl font-bold text-purple-700 mt-1">12</div>
                    <div className="text-[10px] text-purple-600 font-medium mt-1">Total Created</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="text-slate-500 text-xs font-medium">Completed</div>
                    <div className="text-xl font-bold text-emerald-600 mt-1">9</div>
                    <div className="text-[10px] text-emerald-600 font-medium mt-1">75% Complete</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="text-slate-500 text-xs font-medium">Pending</div>
                    <div className="text-xl font-bold text-amber-500 mt-1">3</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-1">In Progress</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                    <div className="text-slate-500 text-xs font-medium">Streak</div>
                    <div className="text-xl font-bold text-purple-600 mt-1">5 Days</div>
                    <div className="text-[10px] text-purple-600 font-medium mt-1">Active Streak</div>
                  </div>
                </div>

                {/* Grid Split Preview: Tasks & Classroom Chat */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Task List Preview */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-600" /> Today's Tasks
                      </span>
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        2 Pending
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                        <span className="line-through text-slate-500 font-medium">
                          Review Data Structures ch.4
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded">
                          Done
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="text-slate-800 font-medium">
                          Complete OS Assignment #2
                        </span>
                        <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Today
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Classroom Chat Snippet */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-violet-600" /> Classroom Chat
                      </span>
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        Socket.IO Live
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                        <div className="text-[10px] font-bold text-violet-600">Aarav</div>
                        <div>Hey team! I uploaded the algorithm notes to classroom materials.</div>
                      </div>
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-900 ml-4">
                        <div className="text-[10px] font-bold text-purple-700">You</div>
                        <div>Thanks! Reviewing them right now.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              Powerful Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need for Academic Excellence
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Streamline your study routine, coordinate with classmates, and track your achievements with purpose-built tools.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-200 transition duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${feature.badgeColor}`}
                  >
                    {feature.badge}
                  </span>
                  <span className="text-slate-400 group-hover:text-purple-600 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-purple-50/40 border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              Simple Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Start collaborating with your peers and organizing your academic schedule in minutes.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-purple-600/30">{step.number}</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-600">100%</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Free for Students
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-violet-600">Real-Time</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Socket.IO Classroom Chat
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-700">Cloud Sync</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Notes & PDF Materials
              </div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">24/7</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                Study Streaks & Analytics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50/60 border border-purple-200 rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-white px-3.5 py-1 rounded-full border border-purple-200">
                About Padhlo
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Empowering Students to Achieve More Together
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Padhlo was created to bridge the gap between individual study habits and group collaboration. Whether you are managing personal coursework deadlines or coordinating assignments within a college group, Padhlo delivers an intuitive platform for notes, chat, tasks, and progress analytics.
              </p>
              <div className="space-y-3 text-sm font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" /> Instant classroom code joining
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" /> Secure user authentication & protected profile data
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" /> Unified dashboard for tasks, streaks, and schedule events
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-purple-100 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow">
                  P
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Parekh Vaibhavi</h4>
                  <p className="text-xs text-purple-700 font-medium">Developer & Creator of Padhlo</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic border-t border-slate-100 pt-4">
                "Padhlo was designed with a focus on simplicity, speed, and real-time student collaboration. My goal was to create a single space where students can keep each other accountable and study efficiently."
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                <GraduationCap className="w-4 h-4 text-purple-600" /> Computer Science & Engineering
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-purple-50/30 border-t border-purple-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-base">
              Find quick answers to common questions about Padhlo.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-purple-700 transition"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-10 sm:p-14 text-center text-white space-y-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to Supercharge Your Study Routine?
              </h2>
              <p className="text-purple-200 text-base sm:text-lg">
                Join thousands of students organizing tasks, sharing notes, and studying together on Padhlo.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center font-bold text-lg shadow">
                P
              </div>
              <span className="text-xl font-bold tracking-tight">Padhlo</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              The collaborative learning platform for modern students. Organize tasks, track streaks, and learn together.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About Padhlo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Developer</h4>
            <p className="text-slate-400">
              Built by <strong className="text-slate-200">Parekh Vaibhavi</strong>.
            </p>
            <p className="text-slate-400">Computer Science & Engineering Student.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Padhlo. All rights reserved.</div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>React & Vite</span> • <span>Node & Express</span> • <span>MongoDB</span> • <span>Socket.IO</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
