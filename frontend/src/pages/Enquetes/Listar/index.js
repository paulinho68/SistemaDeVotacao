import React, {useState,useEffect} from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom';
import api from '../../../services/api';
import MaterialTable from 'material-table';
import Noty from 'noty';
import { formatMs } from '@material-ui/core';

const EnquetesContainer = () => {
  const history = useHistory();
    const [enquetes, setEnquetes] = useState([]);

    useEffect(() => {
      api.get('/').then(res => {
        let data = res.data.filter( item => item.deleted_at === null);
        
        data = data.map(item => {
            let hoje = new Date();
            let data_inicio = new Date(item.data_inicio);
            let data_final = new Date(item.data_fim);
            
            
            if(data_inicio <= hoje && data_final >= hoje){
              return {
                ...item,
                status_nome:"Em andamento"
              }
            }else{
              if(data_final <= hoje){
                return {
                  ...item,
                  status_nome:"Finalizado"
                }
              }else{
                return {
                  ...item,
                  status_nome:"Não Iniciada"
                }
              }
            }
        });
        setEnquetes(data);
      }).catch(err => {
        new Noty({
          text:"Não foi possível carregar as enquetes",
          type:'error',
          layout:'topRight',
          timeout:3000
        }).show()
        console.log(err);
      })
    }, []);

    const deleteEnquete = (id) => {
      console.log(id);
      api.delete(`/enquetesDelete.php?id=${id}`).then(res => {
        if(res.data.success){
          new Noty({
            text:"A enquete foi deletada com sucesso",
            type:'success',
            layout:'topRight',
            timeout:3000
          }).show()
          setEnquetes( enquetes.filter(enquete => enquete.id !== id));
        }else{
          new Noty({
            text:"Não é possível deletar esta enquete",
            type:'error',
            layout:'topRight',
            timeout:3000
          }).show()
        }
      }).catch(err => {
        new Noty({
          text:"Não é possível deletar esta enquete",
          type:'error',
          layout:'topRight',
          timeout:3000
        }).show()
        console.log(err);
      })

    }


    return(
        <main className="table-container">
            <div className="box">
            <MaterialTable
                columns={[
                    { title: 'Título', field: 'titulo' },
                    { title: 'Data de Início', field: 'data_inicio' ,type: 'date'},
                    { title: 'Data Final', field: 'data_fim', type: 'date' },
                    { title: 'Criado Em', field: 'created_at', type: 'date' , defaultSort:"desc"},
                    { title: 'Status', field: 'status_nome'},
                ]}
                data={enquetes}
                actions={[
                    {
                      icon: 'delete',
                      tooltip: 'Deletar esta enquete',
                      onClick: (event, rowData) => {
                        const n = new Noty({
                          text:'<b>Você tem certeza que deseja excluir esta Enquete?<b>',
                          type:'info',
                          modal:true,
                          layout:'top',
                          buttons: [
                            Noty.button('Sim', 'btn btn-success btn-cons', () => {
                              deleteEnquete(rowData.id);
                              n.close()
                            }),
                            Noty.button('Cancelar', 'btn btn-white btn-cons', () => {n.close()})
                          ]                          
                        }).show();
                        console.log(n);
                      }
                    },
                    {
                      icon: 'check_circle_outline',
                      tooltip: 'Votar',
                      onClick: (event, rowData) => {
                        let hoje = new Date();
                        let data_inicio = new Date(rowData.data_inicio);
                        let data_final = new Date(rowData.data_fim);
                        
                        //comparando os anos
                        if(data_inicio <= hoje && data_final >= hoje){
                          sessionStorage.setItem('id',rowData.id);
                          sessionStorage.setItem('title',rowData.titulo);
                          history.push('/votar');
                        }else{
                          if(data_final <= hoje){
                            new Noty({
                              text:"O prazo para participar desta enquete já passou!",
                              type:'warning',
                              layout:'topRight',
                              timeout:3000
                            }).show()
                          }else{
                            new Noty({
                              text:"Esta enquete não está disponível ainda. Fique atendo as datas!",
                              type:'warning',
                              layout:'topRight',
                              timeout:3000
                            }).show()
                          }
                        }



                      }
                    },
                  ]}
                title="Enquetes Criadas"
            />
            </div>
        </main>
    );
}

export default EnquetesContainer;
