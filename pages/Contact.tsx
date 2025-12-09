import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

// 完全保留原始布局，仅进行：
// - 颜色统一
// - 阴影、圆角、间距优化
// - 更柔和的视觉层次
// - 更好的响应式体验

const Contact: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-white text-gray-800 relative z-20">
      {/* Header Image */}
      <div className="h-[40vh] w-full bg-gray-900 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
          className="w-full h-full object-cover opacity-60 scale-105"
          alt="Office"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
            联系我们
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">欢迎洽谈合作</h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed tracking-wide">
              欢迎全球合作伙伴莅临考察、洽谈定制化解决方案。无论是产品咨询还是技术合作，我们随时为您提供支持。
            </p>

            <div className="space-y-8">
              {/* 地址 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">地址</h4>
                  <p className="text-gray-600 leading-relaxed tracking-wide">
                    江苏省苏州市苏州工业园区方泾路 8 号<br />邮编：215121
                  </p>
                </div>
              </div>

              {/* 电话 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">电话</h4>
                  <p className="text-gray-600">+86 0512-66185798</p>
                </div>
              </div>

              {/* 邮箱 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-gray-900">邮箱</h4>
                  <p className="text-gray-600">pai.ma@tops-life.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder (Gaode AMap Embedded) */}
<div className="rounded-2xl overflow-hidden h-[400px] relative shadow-inner">
  <iframe
    title="amap"
    src="https://uri.amap.com/marker?position=120.757,%2031.298&name=%E8%8B%8F%E5%B7%9E%E6%B0%B8%E7%88%B1%E7%94%9F%E5%91%BD%E7%A7%91%E6%8A%80%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8"
    className="w-full h-full border-0"
    allowFullScreen
    loading="lazy"
  ></iframe>
</div>
          <div className="bg-slate-200 rounded-2xl overflow-hidden h-[400px] relative shadow-lg flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700"
              style={{
                backgroundImage:
                  'url(https://via.placeholder.com/800x600/e2e8f0/94a3b8?text=Map:+Suzhou+Industrial+Park+Fangjing+Road+8)',
              }}
            ></div>
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            <div className="relative z-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg text-center border border-white/40">
              <p className="font-bold text-gray-900">苏州永爱生命科技有限公司</p>
              <p className="text-xs text-gray-600">苏州工业园区方泾路 8 号</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <a
        href="mailto:pai.ma@tops-life.com"
        className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-4 rounded-full shadow-xl hover:bg-blue-500/90 hover:scale-110 transition-all z-50 font-bold flex items-center gap-2"
      >
        <Mail size={20} /> 立即咨询
      </a>
    </div>
  );
};

export default Contact;
