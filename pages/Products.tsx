import React from 'react';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    title: "医用软包装",
    desc: "我们的医用软包装解决方案经过专业设计，确保灭菌完整性与产品防护，兼容多种灭菌工艺。",
    img: "https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?q=80&w=1000",
    tags: ["无菌袋", "卷材", "Tyvek"]
  },
  {
    title: "医用注塑部件",
    desc: "10万级洁净室生产，严格把控尺寸精度与材料可追溯性，符合 ISO 13485。",
    img: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1000",
    tags: ["精密注塑", "组装", "OEM/ODM"]
  },
  {
    title: "大豆蛋白产品",
    desc: "植物基高性能粘结剂，100%替代石油基胶黏剂，环保安全，适用于高端包装。",
    img: "https://images.unsplash.com/photo-1615485925763-867862f85771?q=80&w=1000",
    tags: ["生物基", "可降解", "涂布"]
  }
];

const Products: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-tops-white relative z-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-tops-dark">核心业务板块</h1>
        
        <div className="space-y-24">
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 group`}
            >
              <div className="flex-1 w-full relative overflow-hidden rounded-2xl shadow-2xl h-[400px]">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-tops-blue/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
              </div>
              
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-tops-dark">{p.title}</h2>
                <div className="flex gap-2">
                   {p.tags.map((t, idx) => (
                     <span key={idx} className="text-xs font-semibold px-2 py-1 bg-tops-blue/10 text-tops-blue rounded">{t}</span>
                   ))}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {p.desc}
                </p>
                <button className="flex items-center gap-2 text-tops-dark font-medium hover:text-tops-blue transition-colors">
                  查看详情 <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;