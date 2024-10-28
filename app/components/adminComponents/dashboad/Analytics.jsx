import React, { useCallback } from 'react';
import { VisXYContainer, VisGroupedBar, VisAxis, VisBulletLegend } from '@unovis/react';
import { data, capitalize, colors} from './data';

const legendItems = Object.entries(colors).map(([n, c]) => ({
  name: capitalize(n),
  color: c,
}));

export default function BasicGroupedBar() {
  console.log(data); // Check if data is available
  return (
    <div className='border rounded-lg bg-white'>
      <h2 className='text-xl p-3'>Revenue</h2>
      <VisBulletLegend items={legendItems} />
      <VisXYContainer height={'50vh'} data={data}>
        <VisGroupedBar
          x={useCallback(d => d.month, [])}
          y={[
            useCallback(d => d.income, []),
            useCallback(d => d.expenses, []),
          ]}
          color={useCallback((_, i) => legendItems[i].color, [])}
        />
        <VisAxis type="x" label="Months" numTicks={data.length} />
        <VisAxis
          type="y"
          tickFormat={useCallback(value => (value / 10 ** 6).toFixed(1), [])}
          label="Revenue (in millions)"
        />
      </VisXYContainer>
    </div>
  );
}

