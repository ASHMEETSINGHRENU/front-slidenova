import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

export default function Analysis() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Generate realistic business data
  const generateData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    // Revenue data (in thousands)
    const revenue = [45, 52, 48, 61, 73, 82, 94, 108, 125, 142, 168, 195];
    
    // Orders data
    const orders = [28, 32, 35, 42, 51, 58, 67, 78, 89, 102, 118, 135];
    
    // Profit data
    const profit = revenue.map((r, i) => Math.round(r * 0.35));
    
    // Growth rate
    const growth = revenue.map((r, i) => i === 0 ? 0 : Math.round(((r - revenue[i-1]) / revenue[i-1]) * 100));
    
    return { revenue, orders, profit, growth, months };
  };

  const data = generateData();
  const currentMonth = new Date().getMonth();
  const last6Months = data.months.slice(currentMonth - 5, currentMonth + 1);
  const last6Revenue = data.revenue.slice(currentMonth - 5, currentMonth + 1);
  const last6Orders = data.orders.slice(currentMonth - 5, currentMonth + 1);

  // Line Chart Data
  const lineChartData = {
    labels: timeRange === '6months' ? last6Months : data.months,
    datasets: [
      {
        label: 'Revenue (₹ Thousands)',
        data: timeRange === '6months' ? last6Revenue : data.revenue,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Orders',
        data: timeRange === '6months' ? last6Orders : data.orders,
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Bar Chart Data - Monthly Performance
  const barChartData = {
    labels: timeRange === '6months' ? last6Months : data.months,
    datasets: [
      {
        label: 'Revenue (₹ Thousands)',
        data: timeRange === '6months' ? last6Revenue : data.revenue,
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Profit (₹ Thousands)',
        data: timeRange === '6months' ? data.profit.slice(currentMonth - 5, currentMonth + 1) : data.profit,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  // Doughnut Chart - Revenue Distribution
  const doughnutData = {
    labels: ['PPT Design', 'Redesign Services', 'Consultation', 'Premium Templates'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 10,
        spacing: 5,
      },
    ],
  };

  // Radar Chart - Performance Metrics
  const radarData = {
    labels: ['Quality', 'Speed', 'Support', 'Value', 'Innovation', 'Reliability'],
    datasets: [
      {
        label: 'Current Rating',
        data: [4.8, 4.6, 4.9, 4.7, 4.5, 4.8],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointHoverRadius: 8,
        pointRadius: 5,
      },
      {
        label: 'Industry Average',
        data: [4.2, 4.0, 4.1, 4.0, 3.8, 4.1],
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(156, 163, 175)',
        pointBorderColor: '#fff',
        pointHoverRadius: 8,
        pointRadius: 5,
      },
    ],
  };

  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9ca3af',
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#9ca3af',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            let value = context.parsed.y;
            return `${label}: ₹${value}K`;
          }
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            return '₹' + value + 'K';
          }
        },
        title: {
          display: true,
          text: 'Amount (₹ Thousands)',
          color: '#9ca3af',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#9ca3af',
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#9ca3af',
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            let value = context.parsed.y;
            return `${label}: ₹${value}K`;
          }
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value) {
            return '₹' + value + 'K';
          }
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9ca3af',
          padding: 15,
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#9ca3af',
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            let value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      },
    },
    cutout: '60%',
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9ca3af',
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#9ca3af',
      },
    },
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: '#9ca3af',
        },
        ticks: {
          color: '#9ca3af',
          backdropColor: 'transparent',
        },
      },
    },
  };

  // Key Metrics
  const metrics = [
    {
      title: 'Total Revenue',
      value: `₹${(data.revenue[currentMonth] * 1000).toLocaleString()}`,
      change: '+24.3%',
      trend: 'up',
      icon: 'fas fa-chart-line',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Total Orders',
      value: data.orders[currentMonth].toLocaleString(),
      change: '+18.7%',
      trend: 'up',
      icon: 'fas fa-shopping-cart',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Active Clients',
      value: '847',
      change: '+12.5%',
      trend: 'up',
      icon: 'fas fa-users',
      gradient: 'from-pink-500 to-red-500',
    },
    {
      title: 'Avg. Response Time',
      value: '2.4h',
      change: '-0.8h',
      trend: 'down',
      icon: 'fas fa-clock',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  // Growth Insights
  const insights = [
    {
      title: 'Revenue Growth',
      value: '+124%',
      description: 'Year over year revenue increase',
      icon: 'fas fa-chart-line',
      color: 'text-green-400',
    },
    {
      title: 'Customer Satisfaction',
      value: '4.9/5',
      description: 'Based on 500+ reviews',
      icon: 'fas fa-star',
      color: 'text-yellow-400',
    },
    {
      title: 'Project Completion',
      value: '98.5%',
      description: 'On-time delivery rate',
      icon: 'fas fa-check-circle',
      color: 'text-blue-400',
    },
    {
      title: 'Client Retention',
      value: '89%',
      description: 'Returning clients rate',
      icon: 'fas fa-heart',
      color: 'text-red-400',
    },
  ];

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading analysis data...</p>
        </div>
      </div>
    );
  }

  return (

    <div>
         <Navbar />
    <div 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #1a0b2e 100%)"
      }}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-5">
            <span className="text-sm text-indigo-400 font-medium">📊 Analytics Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Business{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real-time analytics and performance metrics for your business growth
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[
            { id: '6months', label: 'Last 6 Months' },
            { id: '12months', label: 'Full Year' },
          ].map((range) => (
            <motion.button
              key={range.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                timeRange === range.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                  : 'glass text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {range.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Key Metrics Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <i className={`${metric.icon} text-white text-xl`}></i>
                  </div>
                  <span className={`text-sm font-semibold ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <i className={`fas fa-arrow-${metric.trend} mr-1`}></i>
                    {metric.change}
                  </span>
                </div>
                <h3 className="text-gray-400 text-sm">{metric.title}</h3>
                <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart - Growth Trends */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                <i className="fas fa-chart-line text-indigo-400 mr-2"></i>
                Growth Trends
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`text-xs px-3 py-1 rounded-full transition ${
                    selectedMetric === 'revenue'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setSelectedMetric('orders')}
                  className={`text-xs px-3 py-1 rounded-full transition ${
                    selectedMetric === 'orders'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Orders
                </button>
              </div>
            </div>
            <div className="h-80">
              <Line data={lineChartData} options={lineOptions} />
            </div>
          </motion.div>

          {/* Bar Chart - Monthly Performance */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              <i className="fas fa-chart-bar text-purple-400 mr-2"></i>
              Monthly Performance
            </h3>
            <div className="h-80">
              <Bar data={barChartData} options={barOptions} />
            </div>
          </motion.div>
        </div>

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Doughnut Chart - Revenue Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              <i className="fas fa-chart-pie text-pink-400 mr-2"></i>
              Revenue Distribution
            </h3>
            <div className="h-80">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>

          {/* Radar Chart - Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              <i className="fas fa-chart-radar text-green-400 mr-2"></i>
              Performance Metrics
            </h3>
            <div className="h-80">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </motion.div>
        </div>

        {/* Growth Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-white font-semibold text-xl mb-4 text-center">
            <i className="fas fa-lightbulb text-yellow-400 mr-2"></i>
            Key Growth Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map((insight, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="glass-card rounded-2xl p-5 text-center"
              >
                <div className={`${insight.color} mb-3`}>
                  <i className={`${insight.icon} text-3xl`}></i>
                </div>
                <h4 className="text-2xl font-bold text-white mb-1">{insight.value}</h4>
                <p className="text-gray-400 text-sm">{insight.title}</p>
                <p className="text-gray-500 text-xs mt-2">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity / Trade Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-white font-semibold text-lg mb-4">
            <i className="fas fa-history text-indigo-400 mr-2"></i>
            Recent Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Transaction ID</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Client</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Service</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#TR-001', client: 'TechCorp Inc.', service: 'Business PPT', amount: '₹2,500', status: 'Completed', date: '2024-01-15' },
                  { id: '#TR-002', client: 'EduGlobal', service: 'Student PPT', amount: '₹800', status: 'Completed', date: '2024-01-14' },
                  { id: '#TR-003', client: 'StartupHub', service: 'Pitch Deck', amount: '₹4,500', status: 'Processing', date: '2024-01-13' },
                  { id: '#TR-004', client: 'Marketing Pro', service: 'Redesign', amount: '₹1,500', status: 'Completed', date: '2024-01-12' },
                  { id: '#TR-005', client: 'FinTech Solutions', service: 'Business PPT', amount: '₹3,000', status: 'Completed', date: '2024-01-11' },
                ].map((transaction, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-3 px-4 text-gray-300 text-sm">{transaction.id}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{transaction.client}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">{transaction.service}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm font-semibold">{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">{transaction.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Export Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <i className="fas fa-download"></i>
            Export Report (PDF)
          </motion.button>
        </motion.div>
      </div>
    </div>
    </div>
  );
}