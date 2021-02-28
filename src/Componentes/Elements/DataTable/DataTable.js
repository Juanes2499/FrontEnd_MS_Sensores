import React, {Component, useState} from 'react'
import { orderBy } from 'lodash';
import { Table, IconButton, Icon } from 'rsuite';
const { Column, HeaderCell, Cell, Pagination } = Table;


const DataTable = ({configuration, data, columns, handleOnRowClick}) => {

    const [page, setPage] = useState(1);
    const [displayLength, setDisplayLength] = useState(5);
    const [loading, setLoading] = useState(false);

    const handleChangePage = (dataKey) =>{

        setPage(dataKey)  
    }

    const handleChangeLength = (dataKey) => {
        setPage(1)
        setDisplayLength(dataKey)          
    }
    
    const getData = (data) => {
        const datos = data.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
                
        return datos
    }
    
    return (
        <div>
            <Table
                width={configuration.width}
                height={configuration.height}
                data={getData(data)}
                onRowClick={handleOnRowClick}
                bordered={configuration.bordered}
                cellBordered={configuration.cellBordered}
                autoHeight={configuration.autoHeight}
                style={configuration.style}
                loading={loading}
            >
                {
                    columns.map((item, index) => {
                        return(
                            <Column key={index} width={item.width} align={item.align} fixed={item.fixed} resizable={configuration.resizable}>
                                <HeaderCell 
                                    style={configuration.headerStyle} 
                                >
                                    {item.text}
                                </HeaderCell>
                                <Cell 
                                    dataKey={item.key} 
                                    style={configuration.cellStyle}
                                />
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