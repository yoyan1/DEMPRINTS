import React, { useCallback } from 'react'
import { VisXYContainer, VisGroupedBar, VisAxis, VisBulletLegend } from '@unovis/react'
import { Button } from '@nextui-org/react';
import { data, capitalize, colors } from './expensesData'


const legendItems = Object.entries(colors).map(([n, c]) => ({
    name: capitalize(n),
    color: c,
  }))

export default function ExpensesAnalysis() {
    return (
        <div>
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className='text-lg font-bold'>Daily Expenses</h1>
                    <span className='text-sm text-default-400'>Data from this week</span>
                </div>
                <Button size="sm" variant="bordered">View Report</Button>
            </div>
            <div className='my-4'>
                <VisBulletLegend items={legendItems}/>
                <VisXYContainer height={'30vh'} data={data}>
                    <VisGroupedBar
                    x={useCallback(d => d.year, [])}
                    y={[
                        useCallback(d => d.expenses, []),
                    ]}
                    color={useCallback((_, i) => legendItems[i].color, [])}
                    />
                    <VisAxis type="x" label="Daily expenses" numTicks={data.length}/>
                    <VisAxis
                    type="y"
                    tickFormat={useCallback((value) => (value / 10 ** 6).toFixed(1), [])}/>
                </VisXYContainer>
            </div>
        </div>
    );
}
