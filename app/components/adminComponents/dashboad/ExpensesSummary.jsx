import React, { useCallback } from 'react'
import { VisSingleContainer, VisDonut, VisBulletLegend } from '@unovis/react'
import {Button} from '@nextui-org/react'

import { data } from './dataSummary'

const legendItems = Object.entries(data).map(([_, data]) => ({
  name: data.key.charAt(0).toUpperCase() + data.key.slice(1),
}))

export default function BasicDonutChart (){
  return (
    <>
        <div>
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className='text-lg font-bold'>Expenses summary</h1>
                    <span className='text-sm text-default-400'>Data from this week</span>
                </div>
                <Button size="sm" variant="bordered">View Report</Button>
            </div>
            <div className=''>
                <VisSingleContainer height={100}>
                    <VisDonut
                    value={useCallback(d => d.value, [])}
                    data={data}
                    showEmptySegments={true}
                    padAngle={0.01}
                    arcWidth={5}
                    />
                </VisSingleContainer>
                <VisBulletLegend items={legendItems}/>
            </div>
        </div>
    </>
  )
}
