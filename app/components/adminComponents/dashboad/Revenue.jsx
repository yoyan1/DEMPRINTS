import React, { useCallback } from 'react';
import { VisXYContainer, VisLine, VisAxis, VisBulletLegend } from '@unovis/react';
import { Button } from '@nextui-org/react';
import {capitalize} from '@/app/composables/utils'

const colors = {
    sales: '#2780eb',
    expenses: '#f45a6d',
}

const legendItems = Object.entries(colors).map(([n, c]) => ({
    name: capitalize(n),
    color: c,
  }))

export default function Revenue() {
    const data = [
        { x: 0, sales: 5, expenses: 1 },
        { x: 1, sales: 2, expenses: 1.5 },
        { x: 3, sales: 1, expenses: 4 },
        { x: 5, sales: 4, expenses: 5 },
        { x: 10, sales: 7, expenses: 9 },
    ];

    return (
        <div>
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className='text-lg font-bold'>Sales and Expenses</h1>
                    <span className='text-sm text-default-400'>Data from today</span>
                </div>
                <Button size="sm" variant="bordered">View Report</Button>
            </div>
            <div className='my-4'>
                <VisBulletLegend items={legendItems}/>
                <VisXYContainer height={'30vh'}>
                    <VisLine
                        data={data}
                        x={useCallback(d => d.x, [])}
                        y={useCallback(d => d.sales, [])}
                        color="#2780eb"
                    />
                    <VisLine
                        data={data}
                        x={useCallback(d => d.x, [])}
                        y={useCallback(d => d.expenses, [])}
                        color="#f45a6d"
                    />
                    <VisAxis type="x" />
                    <VisAxis type="y" />
                </VisXYContainer>
            </div>
        </div>
    );
}
