import React, { useState, useEffect } from 'react'
import { Button, Icon, Checkbox } from 'semantic-ui-react';
import { map, size } from 'lodash';
import { TableAdmin } from "../"
import "./TablesListAdmin.scss"

export function TablesListAdmin(props) {
  const { tables } = props;
  const [ reload, setReload ] = useState(false)
  const [ autoReload, setAutoReload ] = useState(false)
  useEffect(()=> {
    if(autoReload){
      const autoReloadAction = () => {
        onReload()
        setTimeout(()=> {
          autoReloadAction();
        }, 5000)
      }
      autoReloadAction()
    }
  }, [autoReload])

  const onCheckAutoReload = (check) => {
    if(check){
      setAutoReload(check)
    } else {
      window.location.reload()
    }
  }

  const onReload = () => setReload((prev) => !prev)
  return (
    <div className='table-list-admin'>
      <Button primary icon className='table-list-admin__reload' onClick={()=> onReload()}>
        <Icon name="refresh"></Icon>
      </Button>
      <div className='table-list-admin__reload-toggle'>
        <span>Reload automatico</span>
        <Checkbox toggle checked={autoReload} onChange={(_,data)=> onCheckAutoReload(data.checked)}/>
      </div>
      {map(tables, (table)=> (
        <TableAdmin key={table.number} table={table} reload={reload}/>
      ))}
    </div>
  )
}
