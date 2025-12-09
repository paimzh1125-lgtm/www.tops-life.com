// src/pages/Contact.tsx
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageContext';

// --- SVG Icons ---
const Icons = {
  MapPin: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Send: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Clock: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  ExternalLink: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
};

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:pai.ma@tops-life.com?subject=[Website Inquiry] ${formData.subject}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = mailtoLink;
  };

  const content = {
    zh: {
      hero: { title: "联系我们", subtitle: "开启合作新篇章", desc: "无论是产品咨询、技术合作还是商务洽谈，我们随时准备为您提供专业支持。" },
      info: {
        title: "联系方式",
        address: { label: "公司地址", val: "江苏省苏州市苏州工业园区方泾路 8 号", zip: "邮编：215121" },
        phone: { label: "联系电话", val: "+86 0512-66185798" },
        email: { label: "电子邮箱", val: "Topslife@tops-life.com" },
        hours: { label: "工作时间", val: "周一至周五 09:00 - 18:00 (GMT+8)" }
      },
      form: { title: "发送消息", desc: "请填写以下表格，我们的团队将在 24 小时内与您联系。", name: "您的姓名", email: "电子邮箱", subject: "咨询主题", message: "详细需求或留言", btn: "发送邮件" },
      map: { btn: "在地图中查看" }
    },
    en: {
      hero: { title: "Contact Us", subtitle: "Start a Conversation", desc: "Whether for product inquiries, technical cooperation, or business negotiation, we are ready to provide professional support." },
      info: {
        title: "Get in Touch",
        address: { label: "Address", val: "No. 8 Fangjing Road, Suzhou Industrial Park, Jiangsu, China", zip: "Zip: 215121" },
        phone: { label: "Phone", val: "+86 0512-66185798" },
        email: { label: "Email", val: "pai.ma@tops-life.com" },
        hours: { label: "Hours", val: "Mon - Fri 09:00 - 18:00 (GMT+8)" }
      },
      form: { title: "Send a Message", desc: "Fill out the form below and our team will get back to you within 24 hours.", name: "Your Name", email: "Email Address", subject: "Subject", message: "Message / Requirements", btn: "Send Email" },
      map: { btn: "View on Map" }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans">

      {/* Hero */}
      <div className="h-[45vh] w-full relative overflow-hidden bg-slate-900">
        <img src="/banner/outsligth.jpg" className="w-full h-full object-cover opacity-60" alt="Contact Banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 mt-10">
          <span className="text-sky-400 font-bold tracking-[0.2em] uppercase mb-4">{t.hero.subtitle}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">{t.hero.title}</h1>
          <p className="text-slate-300 max-w-2xl text-lg">{t.hero.desc}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 -mt-20 relative z-10 grid lg:grid-cols-2 gap-12">

        {/* Left Column */}
        <div className="space-y-8">

          {/* Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-sky-500 pl-4">{t.info.title}</h2>
            
            {/* Address */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600"><Icons.MapPin /></div>
              <div>
                <h4 className="font-bold text-lg text-slate-800">{t.info.address.label}</h4>
                <p className="text-slate-600">{t.info.address.val}<br/><span className="text-slate-400 text-sm">{t.info.address.zip}</span></p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600"><Icons.Phone /></div>
              <div>
                <h4 className="font-bold text-lg text-slate-800">{t.info.phone.label}</h4>
                <p className="text-slate-600 font-mono text-lg">{t.info.phone.val}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600"><Icons.Mail /></div>
              <div>
                <h4 className="font-bold text-lg text-slate-800">{t.info.email.label}</h4>
                <a href={`mailto:${t.info.email.val}`} className="text-sky-600 hover:underline text-lg">{t.info.email.val}</a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-5 border-t border-slate-100 pt-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400"><Icons.Clock /></div>
              <div>
                <h4 className="font-bold text-lg text-slate-800">{t.info.hours.label}</h4>
                <p className="text-slate-500">{t.info.hours.val}</p>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="bg-white rounded-2xl overflow-hidden h-[300px] relative shadow-lg border border-slate-100">
            <iframe
              title="Gaode Map"
              src="https://uri.amap.com/marker?position=120.757,31.298&name=%E8%8B%8F%E5%B7%9E%E6%B0%B8%E7%88%B1%E7%94%9F%E5%91%BD%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

        </div>

        {/* Right Column: Form */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.form.title}</h2>
          <p className="text-slate-500 mb-8">{t.form.desc}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" name="name" required placeholder={t.form.name} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"/>
              <input type="email" name="email" required placeholder={t.form.email} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"/>
            </div>
            <input type="text" name="subject" required placeholder={t.form.subject} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"/>
            <textarea name="message" rows={6} required placeholder={t.form.message} onChange={handleInputChange} className="w-full p-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none"/>
            <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl hover:bg-sky-500 transition-all flex items-center justify-center gap-2"><Icons.Send /> {t.form.btn}</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Contact;
