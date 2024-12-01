import React from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  BarChart2,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  ExternalLink,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <CreditCard className="h-8 w-8 text-indigo-600" />,
      title: "Easy Payments",
      description:
        "Make secure payments for tuition, fees, and other educational expenses with just a few clicks.",
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-indigo-600" />,
      title: "Payment Analytics",
      description:
        "Track your payment history, upcoming dues, and financial statistics through intuitive dashboards.",
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "Timely Reminders",
      description:
        "Never miss a payment deadline with automated reminders and payment schedules.",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Secure Transactions",
      description:
        "Rest easy with our bank-grade security measures protecting your financial information.",
    },
  ];

  const testimonials = [
    {
      name: "Ahmed Mohammed",
      role: "Parent",
      content:
        "This payment system has made managing my children's school fees incredibly simple. The automatic reminders are a lifesaver!",
      avatar: "/api/placeholder/32/32",
    },
    {
      name: "David Ejiofor",
      role: "Student",
      content:
        "The payment tracking feature helps me stay on top of my finances. It's user-friendly and very efficient.",
      avatar: "/api/placeholder/32/32",
    },
    {
      name: "Vivian Eze",
      role: "School Administrator",
      content:
        "This platform has streamlined our payment collection process significantly. The analytics are particularly helpful.",
      avatar: "/api/placeholder/32/32",
    },
  ];

  return (
    <>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                  Seamless School Fee Payments
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                  Effortlessly manage departmental fee, religious dues, and
                  other fee payments with a secure, user-friendly platform.
                  Simplifying financial processes for students and institutions
                  alike in the Federal Polytechnic Bida.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={"/register"}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-slate-600">
                        Secure Payments
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-slate-600">
                        24/7 Support
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-slate-600">
                        Easy Payment
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="pb-20 pt-5 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Everything You Need to Make and Manage Payments
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Streamline your educational payments with our comprehensive
                suite of features designed for both students and guidians
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  1M+
                </div>
                <div className="text-slate-600">Transactions Processed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  1000+
                </div>
                <div className="text-slate-600">Partner Institutions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  99.9%
                </div>
                <div className="text-slate-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  24/7
                </div>
                <div className="text-slate-600">Customer Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Trusted by Students and Institutions
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                See what our users have to say about their experience with the
                payment portal.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 bg-slate-50 rounded-lg">
                  <div className="flex items-center mb-4">
                    {/* <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full"
                    /> */}
                    <div className="">
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-600">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-indigo-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students at The Federal Polytechnic Bida who
                trust our comprehensive payment system for all their educational
                payment needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={"/register"}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200"
                >
                  Create an Account
                </Link>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-500 transition-colors duration-200"
                >
                  Contact Admin
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
