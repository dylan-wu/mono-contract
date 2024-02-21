
import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Dynamic import to load D3 only on client-side
const D3Script = dynamic(
  () => import('../components/D3Script'),
  { ssr: false }
);

const data = [
  { 'label': 'Item 6', 'cost': 50000, 'width': 252, 'white_rect_x': 237 },
  { 'label': 'Item 8', 'cost': 50000, 'width': 244, 'white_rect_x': 229 },
  { 'label': 'Item 7', 'cost': 40000, 'width': 219, 'white_rect_x': 204 },
  { 'label': 'Item 3', 'cost': 30000, 'width': 115, 'white_rect_x': 100 },
  { 'label': 'Item 5', 'cost': 20000, 'width': 93, 'white_rect_x': 78 },
  { 'label': 'Item 10', 'cost': 20000, 'width': 69, 'white_rect_x': 54 }
];

const BarChartComponent: FC = () => {
  return (
    <>
      <Head>
        <script defer src="https://d3js.org/d3.v7.min.js"></script>
      </Head>
      <style jsx>{`
        .chart-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          width: 374px;
        }
        .bar-container {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }
        .bar-label {
          display: flex;
          align-items: center;
          gap: 24px;
          align-self: stretch;
        }
        .dollar-text {
          color: #0B3D91;
          font-family: 'Lato', sans-serif;
          font-size: 14px;
          font-weight: 600;
          margin-left: 12px;
        }
      `}</style>
      <div className="chart-container">
        <div id="bars"></div>
      </div>
      <D3Script data={data} />
    </>
  );
};

export default BarChartComponent;
