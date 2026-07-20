'use client';

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

export interface CategoryData {
  name: string;
  count: number;
  color: string;
}

export function CategoryChart({ data }: { data: CategoryData[] }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-text-main)] mb-4 text-center">
          Category Overview
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore the distribution of our available travel packages across different experiences.
        </p>

        <div className="w-full h-[400px] max-w-4xl mx-auto bg-[var(--color-neutral-bg)] p-6 rounded-[var(--radius-card)] shadow-sm border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
                formatter={(value: any) => [`${value} Tours`, 'Available']}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
