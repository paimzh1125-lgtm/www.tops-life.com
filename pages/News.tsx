import React from 'react';

const newsItems = [
  { year: "2025", month: "01", title: "通过法国 EcoVadis 可持续发展评分", desc: "托普斯在环境、劳工与人权、商业道德等方面的表现获得国际认可。" },
  { year: "2021", month: "05", title: "成立新材料部门", desc: "正式拓展环保水性油墨及纸品包装业务，致力于减少碳足迹。" },
  { year: "2019", month: "10", title: "新建 10 万级洁净室投入运营", desc: "大幅提升医用部件生产能力，满足日益增长的市场需求。" },
  { year: "2019", month: "03", title: "取得 ISO 13485 & 9001 证书", desc: "质量管理体系获得国际标准认证，为医疗产品安全保驾护航。" }
];

const News: React.FC = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 relative z-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-bold mb-16 text-center">新闻动态</h1>
        
        <div className="grid gap-6">
          {newsItems.map((item, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-tops-blue/30 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
            >
               <div className="flex flex-col items-center justify-center min-w-[80px] text-tops-blue">
                  <span className="text-3xl font-bold leading-none">{item.year}</span>
                  <span className="text-sm font-medium uppercase tracking-wider">{item.month}</span>
               </div>
               <div className="flex-1">
                  <h3 className="text-xl font-bold text-tops-dark mb-2 group-hover:text-tops-blue transition-colors">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;