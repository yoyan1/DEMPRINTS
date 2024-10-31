import React, { useCallback } from 'react'
import { VisSingleContainer, VisDonut, VisBulletLegend } from '@unovis/react'
import {Button} from '@nextui-org/react'
import { capitalize } from '@/app/composables/utils'
import { data, colors } from './dataSummary'

const legendItems = Object.entries(colors).map(([n, c]) => ({
  name: capitalize(n),
  color: c,
}))

export default function BasicDonutChart (){
  let total = 0
    data.map(item =>{
        total += item.value
    })
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
            <div className='flex items-center gap-5'>
                <VisSingleContainer height={100} width={100}>
                    <VisDonut
                    value={useCallback(d => d.value, [])}
                    data={data}
                    showEmptySegments={true}
                    padAngle={0.01}
                    arcWidth={5}
                    centralLabel={`₱${total}`}
                    centralSubLabel='Total expenses in all category'
                    />
                </VisSingleContainer>
                <VisBulletLegend items={legendItems}/>
            </div>
        </div>
    </>
  )
}