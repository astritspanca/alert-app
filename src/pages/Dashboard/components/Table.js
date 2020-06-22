import React from 'react';

const Table = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 dashboard-table">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">EVENT</th>
                                <th scope="col">METHOD</th>
                                <th scope="col">VALUE</th>
                                <th scope="col">CREATED</th>
                                <th scope="col">DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="event-td">ICON Mark</td>
                                <td className="method-td">ICON Mark</td>
                                <td className="value-td">ICON Mark</td>
                                <td className="created-td">1 days ago</td>
                                <td className="created-td">DELETE</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;