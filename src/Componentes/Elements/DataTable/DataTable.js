import React, {Component, useState} from 'react'
import { orderBy } from 'lodash';
import { Table, IconButton, Icon } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;

const getData = (data, displayLength, page) => {
    return data.filter((v, i) => {
      const start = displayLength * (page - 1);
      const end = start + displayLength;
      return i >= start && i < end;
    });
  }

const DataTable = ({configuration, data, columns, handleOnRowClick}) => {

    const [page, setPage] = useState(1);
    const [displayLength, setDisplayLength] = useState(10);

    const handleChangePage = (dataKey) =>{
        setPage(dataKey)
    }
    const handleChangeLength = (dataKey) => {
        setPage(1)
        setDisplayLength(dataKey)
    }
      
    return (
        <div>
            <Table
                width={configuration.width}
                height={configuration.height}
                data={getData(data, displayLength, page)}
                onRowClick={handleOnRowClick}
            >
                {
                    columns.map((item, index) => {
                        return(
                            <Column key={index} width={item.width} align={item.align} fixed={item.fixed} resizable={item.resizable}>
                                <HeaderCell>{item.text}</HeaderCell>
                                <Cell dataKey={item.key} />
                            </Column>
                        )
                    })
                }           
            </Table>
            <Table.Pagination
                lengthMenu={[
                    {
                        value: 5,
                        label: 5
                    },
                    {
                        value: 10,
                        label: 10
                    },
                    {
                        value: 15,
                        label: 15
                    },
                    {
                        value: 20,
                        label: 20
                    }
                ]}
                activePage={page}
                displayLength={displayLength}
                total={data.length}
                onChangePage={handleChangePage}
                onChangeLength={handleChangeLength}
            />
        </div>
    )

}

export default DataTable