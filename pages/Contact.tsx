import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-tops-white relative z-20">
      {/* Header Image */}
      <div className="h-[40vh] w-full bg-tops-dark relative overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000" 
            className="w-full h-full object-cover opacity-40" 
            alt="Office" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white tracking-tight">联系我们</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
           {/* Info */}
           <div>
              <h2 className="text-3xl font-bold mb-6 text-tops-dark">欢迎洽谈合作</h2>
              <p className="text-slate-600 mb-10 text-lg">
                欢迎全球合作伙伴莅临考察、洽谈定制化解决方案。无论是产品咨询还是技术合作，我们随时为您提供支持。
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-tops-blue">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">地址</h4>
                        <p className="text-slate-600">江苏省苏州市苏州工业园区方泾路 8 号<br/>邮编：215121</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-tops-blue">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">电话</h4>
                        <p className="text-slate-600">+86 0512-66185798</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-tops-blue">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">邮箱</h4>
                        <p className="text-slate-600">pai.ma@tops-life.com</p>
                    </div>
                </div>
              </div>
           </div>

           {/* Map Placeholder */}
           <div className="bg-slate-200 rounded-2xl overflow-hidden h-[400px] relative shadow-inner flex items-center justify-center">
              {/* Using a static map image for reliability */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: 'url(https://via.placeholder.com/800x600/e2e8f0/94a3b8?text=Map:+Suzhou+Industrial+Park+Fangjing+Road+8)' }}
              ></div>
              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
              <div className="relative z-10 bg-white p-4 rounded shadow-lg text-center">
                 <p className="font-bold text-tops-dark">苏州永爱生命科技有限公司</p>
                 <p className="text-xs text-slate-500">苏州工业园区方泾路 8 号</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Fixed CTA */}
      <a 
        href="mailto:pai.ma@tops-life.com"
        className="fixed bottom-8 right-8 bg-tops-blue text-white px-6 py-4 rounded-full shadow-2xl hover:bg-sky-400 hover:scale-110 transition-all z-50 font-bold flex items-center gap-2 animate-pulse"
      >
        <Mail size={20} /> 立即咨询
      </a>
    </div>
  );
};

export default Contact;
