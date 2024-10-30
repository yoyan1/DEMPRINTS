import React, { useCallback } from 'react'
import { VisSingleContainer, VisDonut, VisBulletLegend } from '@unovis/react'
import {Button} from '@nextui-org/react'
import { capitalize } from '@/app/composables/utils'
import { data, colors } from './salesSourceSummary'

const legendItems = Object.entries(colors).map(([n, c]) => ({
    name: capitalize(n),
    color: c,
  }))
export default function BasicDonutChart (){
  return (
    <>
        <div>
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className='text-lg font-bold'>Sales Source summary</h1>
                    <span className='text-sm text-default-400'>Data from this week</span>
                </div>
                <Button size='sm' variant="bordered">View Report</Button>
            </div>
            <div className='flex'>
                <VisSingleContainer height={100} width={100}>
                    <VisDonut
                    value={useCallback(d => d.value, [])}
                    data={data}
                    showEmptySegments={true}
                    padAngle={0.01}
                    arcWidth={5}
                    />
                </VisSingleContainer>
                <VisBulletLegend className='flex flex-col justify-center ml-5' items={legendItems}/>
            </div>
        </div>
    </>
  )
}
