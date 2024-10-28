import {Listbox, ListboxItem} from "@nextui-org/react";
import { FaPersonWalking } from "react-icons/fa6";
import { MdBookOnline } from "react-icons/md";
import { FaShareFromSquare } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";

export default function SalesCategory() {
  const customerType = [
    {name: 'Tarpaulin', percent: '+20%'}, 
    {name: 'Photo copy', percent:'-10%'},
    {name:'Photo Print', percent: '+5%'},
    {name:'Xerox', percent: '+30%'}
  ]
  return (
    <Listbox
      aria-label="User Menu"
      topContent={<h1 className="p-3">Sales category breakdown</h1>}
      onAction={(key) => alert(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      {customerType.map(type => (
        <ListboxItem
          key={type.name}
          endContent={<span className={`text-sm ${type.percent[0] === '+'? 'text-success' : 'text-red-500'}` }>{type.percent}</span>}
          startContent={
            <div className="flex items-center rounded-small justify-center w-7 h-7 bg-primary/10 text-primary">
              {type.name.toLowerCase() === 'walk-in'? (
                <FaPersonWalking/>
              ):type.name.toLowerCase() === 'online'?(
                <MdBookOnline/> 
              ): type.name.toLowerCase() === 'refferal'?(
                <FaShareFromSquare/>  
              ): (
                <FaCircleQuestion/>
              ) }
            </div>
          }
        >
          {type.name}
        </ListboxItem>
      ))}
    </Listbox>
  );
}