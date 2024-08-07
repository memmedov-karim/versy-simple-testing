import React from 'react'
import './TableStyle.css'

export default function Table({data}) {
  return (
      <div>
          <table>
              <thead>
                  <tr>
                      <th>№</th>
                      <th>Kodu</th>
                      <th>Təhsil</th>
                      <th>Adı</th>
                      <th>Universitet</th>
                      <th>Pulsuz bal</th>
                      <th>Pullu bal</th>
                      <th>Şans</th>
                    <th>Plan</th>
                      <th>İnfo</th>
                  </tr>
              </thead>

              <tbody>
                {data?.map((val,index)=>(
                    <tr>
                    <td>{index+1}.</td>
                    <td width={90}>{val.specialityid}</td>
                    <td width={30}>DS/ÖD</td>
                    <td>{val.name}</td>
                    <td title={val.university}>{val.unishortname}<sub>{val?.loc}</sub></td>
                    <td>{val.freescore}</td>
                    <td>{val.paidlyscore}</td>
                    <td>{val.percentage}%</td>
                      <td>{val.planplacenumber}</td>
                    <td><i className="fa-solid fa-circle-info"></i></td>
                </tr>

                ))}
                 
              </tbody>
          </table>
      </div>
  )
}
