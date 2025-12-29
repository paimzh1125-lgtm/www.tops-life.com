import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <>
      {/* 1. 嵌入 CSS 样式 */}
      <style>{`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .example-2 {
          display: flex;
          justify-content: flex-start; /* 修改：左对齐适配 Footer */
          align-items: center;
          flex-direction: row; /* 修改：水平排列 */
        }
        .example-2 .icon-content {
          margin: 0 10px 0 0; /* 修改：调整间距 */
          position: relative;
          padding: 0.5rem;
          z-index: 20;
        }
        .example-2 .icon-content .tooltip {
          position: absolute;
          top: -40px; /* 修改：Tooltip 在上方 */
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          padding: 6px 10px;
          border-radius: 5px;
          opacity: 0;
          visibility: hidden;
          font-size: 14px;
          transition: all 0.3s ease;
          white-space: nowrap;
          pointer-events: none;
        }
        .example-2 .icon-content:hover .tooltip {
          opacity: 1;
          visibility: visible;
          top: -50px;
        }
        .example-2 .icon-content a {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px; /* 微调大小适配 Footer */
          height: 40px;
          border-radius: 50%;
          color: #4d4d4d;
          background-color: #f1f5f9; /* Slate-100 */
          transition: all 0.3s ease-in-out;
        }
        .example-2 .icon-content a:hover {
          box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
        }
        .example-2 .icon-content a svg {
          position: relative;
          z-index: 1;
          width: 20px;
          height: 20px;
        }
        .example-2 .icon-content a:hover {
          color: white;
        }
        .example-2 .icon-content a .filled {
          position: absolute;
          top: auto;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background-color: #000;
          transition: all 0.3s ease-in-out;
        }
        .example-2 .icon-content a:hover .filled {
          height: 100%;
        }

        /* LinkedIn Color */
        .example-2 .icon-content a[data-social="linkedin"] .filled,
        .example-2 .icon-content a[data-social="linkedin"] ~ .tooltip {
          background-color: #0274b3;
        }

        /* WeChat Color (新增) */
        .example-2 .icon-content a[data-social="wechat"] .filled,
        .example-2 .icon-content a[data-social="wechat"] ~ .tooltip {
          background-color: #07C160;
        }
        
        /* Github Color (保留作为示例) */
        .example-2 .icon-content a[data-social="github"] .filled,
        .example-2 .icon-content a[data-social="github"] ~ .tooltip {
          background-color: #24262a;
        }
      `}</style>

      {/* 2. Footer 组件结构 */}
      <footer className="bg-white text-slate-700 py-12 border-t border-slate-300 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            
            {/* 公司简介与社交图标 */}
            <div className="md:col-span-1">
              <h3 className="text-sky-600 text-xl font-bold mb-4">TOPS LIFE</h3>
              <p className="text-sm leading-relaxed mb-6">
                致力于推动医疗安全、药用包装性能提升及可持续生物材料解决方案的发展。
              </p>
              
              {/* === 融合后的社交图标 === */}
              <ul className="example-2">
                {/* LinkedIn */}
                <li className="icon-content">
                  <a href="#" aria-label="LinkedIn" data-social="linkedin">
                    <div className="filled"></div>
                    <Linkedin />
                  </a>
                  <div className="tooltip">LinkedIn</div>
                </li>

                {/* WeChat (使用 MessageCircle 代替) */}
                <li className="icon-content">
                  <a href="#" aria-label="WeChat" data-social="wechat">
                    <div className="filled"></div>
                    <MessageCircle />
                  </a>
                  <div className="tooltip">WeChat</div>
                </li>

                {/* GitHub (可选，如果不需要可以删除) */}
                <li className="icon-content">
                  <a href="#" aria-label="GitHub" data-social="github">
                    <div className="filled"></div>
                    <Github />
                  </a>
                  <div className="tooltip">GitHub</div>
                </li>
              </ul>
            </div>
            
            {/* 快速链接 */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#/" className="hover:text-sky-600 transition-colors">首页</a></li>
                <li><a href="#/about" className="hover:text-sky-600 transition-colors">关于我们</a></li>
                <li><a href="#/products" className="hover:text-sky-600 transition-colors">业务板块</a></li>
                <li><a href="#/news" className="hover:text-sky-600 transition-colors">新闻动态</a></li>
              </ul>
            </div>

            {/* 联系方式 */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-4">联系方式</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 text-sky-600 shrink-0" />
                  <span>江苏省苏州市苏州工业园区<br/>方泾路 8 号</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-sky-600 shrink-0" />
                  <span>+86 0512-66185798</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-sky-600 shrink-0" />
                  <span>pai.ma@tops-life.com</span>
                </li>
              </ul>
            </div>

            {/* 认证资质 */}
            <div>
              <h4 className="text-slate-900 font-semibold mb-4">认证资质</h4>
              <div className="flex gap-3 text-xs">
                <span className="px-3 py-1 border border-slate-300 rounded text-sky-600 font-medium">ISO 9001</span>
                <span className="px-3 py-1 border border-slate-300 rounded text-sky-600 font-medium">ISO 13485</span>
              </div>
            </div>
          </div>

          {/* 底部版权 */}
          <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>© 2025 Suzhou Tops Life Technology Co., Ltd. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#/privacy-policy" className="hover:text-sky-600 transition-colors">隐私政策</a>
              <a href="#/terms-and-conditions" className="hover:text-sky-600 transition-colors">条款与条件</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
