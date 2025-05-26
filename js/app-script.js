const definirSaudacao = () => {
        const header = document.querySelector('#saudacaoHeader');
        if (!header) {
            console.error("Elemento com id 'saudacaoHeader' não encontrado.");
            return;
        }
    
        setInterval(() => {
            const now = new Date();
            const horas = now.getHours();
            const minutos = now.getMinutes().toString().padStart(2,'0');
            const segundos = now.getSeconds().toString().padStart(2, '0');
            const dataAtual = now.toLocaleDateString('pt-BR');
    
            let saudacao;
    
            if(horas >= 6 && horas < 12 ){
                saudacao = 'Bom dia!';
            }else if(horas >= 12 && horas <= 18){
                saudacao = 'Boa tarde!';
            }else{
                saudacao = 'Boa noite!';
            }
    
            header.innerHTML = `<span>${saudacao}</span> <span>${dataAtual} ${horas}:${minutos}:${segundos}</span>`;
    
        }, 1000);
    };
    
    document.addEventListener('DOMContentLoaded', definirSaudacao);
    
// Carregar tarefas do localStorange ao iniciar
const carregarTarefas = () =>{
    const taskList = document.querySelector('#taskList');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach(tarefa => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if(tarefa.concluida){
            taskItem.classList.add('concluida');
        }
        taskItem.innerHTML = tarefa.html;
        taskList.appendChild(taskItem);
        // Adicionando eventListers aos botões da tarefa.
        taskItem.querySelector('.complete-btn').addEventListener('click',function(){
            marcarComoConcluida(this);
        });
        taskItem.querySelector('.edit-btn').addEventListener('click', function(){
            editarTarefas(this);
        });
        taskItem.querySelector('.delete-btn').addEventListener('click', function(){
            excluirTarefa(this);
        })
    });
}
// Função para adicionar uma nova tarefa
const adicionarTarefa = () =>{
    const taskName = document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;
    const taskTime = document.querySelector('#taskTime').value;

    if(taskName && taskDate && taskTime){
        const taskList = document.querySelector('#taskList');

        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const dataInput = taskDate.split('-');


        const dataFormatada = `${dataInput[2]}/${dataInput[1]}/${dataInput[0]}`;

        const taskHTML = `
        <h3>${taskName}</h3>
        <p>${taskDescription}</p>
        <p class="data"><strong>Vencimento:</strong> ${dataFormatada} às ${taskTime}</p>
            <div class="task-actions">
                <button class="complete-btn">Concluir</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;

        taskItem.innerHTML= taskHTML;
        taskList.appendChild(taskItem);

        taskItem.querySelector('.complete-btn').addEventListener('click',function(){
            marcarComoConcluida(this);
        });
        taskItem.querySelector('.edit-btn').addEventListener('click', function(){
            editarTarefas(this);
        });
        taskItem.querySelector('.delete-btn').addEventListener('click', function(){
            excluirTarefa(this);
        })

        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push({
            nome:taskName,
            descricao: taskDescription,
            data: taskDate,
            hora: taskTime,
            html: taskHTML
        });

        // Conversão do objeto para string
        localStorage.setItem('tarefas',JSON.stringify(tarefas));
        // Informação para o usuário
        alert('Tarefa adicionada com sucesso!');
        // Limpar campos dos formulario
        document.querySelector('#taskForm').reset();

    }else{
        Swal.fire({
            icon: "error",
            title: "Falta de informações",
            text: "Por favor preencha os outros campos",
          });
    }

}

window.onload = function(){
    definirSaudacao();
    carregarTarefas();

    // Adicionando event listeners para os botões
  document.querySelector('#adicionarTarefaBtn').addEventListener('click', function (e) {
    e.preventDefault();
    adicionarTarefa();
  });

  // Event listeners para os botões de filtro
  document.querySelector('#filtrarTodasBtn').addEventListener('click', function() {
    filtrarTarefas('todas');
  });
  
  document.querySelector('#filtrarPendentesBtn').addEventListener('click', function() {
    filtrarTarefas('pendentes');
  });
  
  document.querySelector('#filtrarConcluidasBtn').addEventListener('click', function() {
    filtrarTarefas('concluidas');
  });
  
  // Event listeners para os botões de ordenação
  document.querySelector('#ordenarRecentesBtn').addEventListener('click', function() {
    ordenarTarefas('recentes');
  });
  
  document.querySelector('#ordenarAntigasBtn').addEventListener('click', function() {
    ordenarTarefas('antigas');
  });
  document.querySelector('#lixeiraBtn').addEventListener('click', function(){
    mostrarTarefasExcluidas();
});
};

const marcarComoConcluida = (button) => {
    const taskItem = button.closest('.task-item')

    if (taskItem.classList.contains('concluida')){
        taskItem.classList.remove('concluida')
        Swal.fire({
            title: "Tarefa Restaurada",
            icon: "success",
            draggable: true
          });
        return
    }

    taskItem.classList.add('concluida')

    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn')

    editBtn.disabled=true
    deleteBtn.disabled=true

    const taskName = taskItem.querySelector('h3').textContent
    let tarefas = JSON.parse(localStorage.getItem('tarefas'))||[]
    const tarefaIndex = tarefas.findIndex (t => t.nome === taskName)

    if (tarefaIndex !== -1){
        tarefas [tarefaIndex].concluida = true
        tarefas[tarefaIndex].html = taskItem.innerHTML

        

        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    setTimeout(()=>{
        Swal.fire({
            title: "Tarefa Concluida com sucesso",
            icon: "success",
            draggable: true
          });
    }, 200)
}

// const editarTarefas = (button) => {
//     const taskItem = button.closest('.task-item')
    
//     const newName = prompt('Edite o nome da tarefa: ', taskItem.querySelector('h3').textContent);
//     const newDescription = prompt('Edite a descrição da tarefa: ', taskItem.querySelector('p').textContent())

//     const newName = prompt('Edite o nome da tarefa:', oldName);
//     const newDescription = prompt('Edite a descrição da tarefa:', oldDescription);

//     if (newName && newDescription) {
//         taskItem.querySelector('h3').textContent = newName;
//         taskItem.querySelector('p').textContent = newDescription;

//         // Atualizar localStorage
//         let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
//         const tarefaIndex = tarefas.findIndex(t => t.nome === oldName);

//         if (tarefaIndex !== -1) {
//             tarefas[tarefaIndex].nome = newName;
//             tarefas[tarefaIndex].descricao = newDescription;

//             // Atualiza o HTML salvo
//             tarefas[tarefaIndex].html = taskItem.innerHTML;

//             localStorage.setItem('tarefas', JSON.stringify(tarefas));
//             alert('Tarefa atualizada com sucesso!');
//         }
//     } else {
//         alert('A edição foi cancelada ou inválida.');
//     }
// };

const editarTarefas = (button) => {
    const taskItem = button.closest('.task-item');
    
    const oldName = taskItem.querySelector('h3').textContent;
    const oldDescription = taskItem.querySelector('p').textContent;

    const newName = prompt('Edite o nome da tarefa:', oldName);
    const newDescription = prompt('Edite a descrição da tarefa:', oldDescription);

    if (newName && newDescription) {
        taskItem.querySelector('h3').textContent = newName;
        taskItem.querySelector('p').textContent = newDescription;

        // Atualizar localStorage
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        const tarefaIndex = tarefas.findIndex(t => t.nome === oldName);

        if (tarefaIndex !== -1) {
            tarefas[tarefaIndex].nome = newName;
            tarefas[tarefaIndex].descricao = newDescription;

            // Atualiza o HTML salvo
            tarefas[tarefaIndex].html = taskItem.innerHTML;

            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            alert('Tarefa atualizada com sucesso!');
        }
    } else {
        alert('A edição foi cancelada ou inválida.');
    }
};



const excluirTarefa = (button) => {
  
    // Interação com Usuário
    if (confirm('Deseja realmente excluir esta tarefa?')) {
        const taskItem = button.closest('.task-item');
        const taskName = taskItem.querySelector('h3').textContent;
    
        //Obter as tarefas que estão no localStorage
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        let tarefasLixeira = JSON.parse(localStorage.getItem('tarefasLixeira')) || [];
        
    
        // Procurar no Array a tarefa que será excluída
        const tarefaIndex = tarefas.findIndex(t => t.nome === taskName);
    
        if (tarefaIndex !== -1) {
            // Remove a tarefa da lista de tarefas ativas
            const tarefaExcluida = tarefas.splice(tarefaIndex, 1)[0];
    
            // Adiciona a tarefa à lixeira
            tarefasLixeira.push(tarefaExcluida);
    
            // Atualiza o localStorage
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            localStorage.setItem('tarefasLixeira', JSON.stringify(tarefasLixeira));
    
            // Atualiza a interface de tarefas
            taskItem.remove();
    
            alert('Tarefa movida para a lixeira.');
        }
    }
    };
// Funções para filtrar tarefas

const filtrarTarefas = (filtro) => {
    const tarefas = document.querySelectorAll('.task-item')
    console.log(tarefas)

    tarefas.forEach(tarefa => {
        switch(filtro){
            case'todas':
                tarefa.style.display = 'block';

                break;
        
            case 'pendentes':

                tarefa.style.display = tarefa.classList.contains('concluida') ? 'none' : 'block'

                break;

            case 'concluidas':
                tarefa.style.display = tarefa.classList.contains('concluida') ? 'block' : 'none'

                break;
            }


    })
}

// const ordenarTarefas = (ordem) => {
//     // Seleciona todos os elementos .task-item
//     const tarefas = document.querySelectorAll('.task-item');

//     // Converte o NodeList em array para poder ordenar
//     const tarefaArray = Array.from(tarefas);

//     // Ordena o array com base na data de vencimento (contida em .data)
//     tarefaArray.sort((a, b) => {
//         const dataTextoA = a.querySelector('.data').textContent.trim(); // Ex: "2025-05-12"
//         const dataTextoB = b.querySelector('.data').textContent.trim();


//         function parseDataBR(dataBR) {
//             const [dia, mes, ano] = dataBR.split('/');
//             return new Date(`${ano}-${mes}-${dia}`);
//         }

//         const dataA = parseDataBR(dataTextoA);
//         const dataB = parseDataBR(dataTextoB);

//         return ordem === 'crescente' 
//             ? dataA - dataB   // Mais próximas primeiro
//             : dataB - dataA;  // Mais distantes primeiro
//     });

//     // Seleciona o container que contém as tarefas
//     const container = document.querySelector('#taskList');

//     // Remove os itens atuais e reanexa na nova ordem
//     tarefaArray.forEach(tarefa => {
//         container.appendChild(tarefa);
//     });

// };

// document.getElementById('ordenarRecentesBtn').addEventListener('click', () => {
//     ordenarTarefas('crescente');
// });

// document.getElementById('ordenarAntigasBtn').addEventListener('click', () => {
//     ordenarTarefas('decrescente');
// }); 

const ordenarTarefas = (ordem) => {
    const taskList = document.querySelector('#taskList')

    const tarefas = Array.from(document.querySelectorAll('.task-item'))

    const dadosTarefas= JSON.parse(localStorage.getItem('tarefas')) || []

    tarefas.sort((a, b) => {
        const nomeA = a.querySelector('h3').textContent
        const nomeB = b.querySelector('h3').textContent
    
        const tarefaA = dadosTarefas.find(t => t.nome === nomeA)
        const tarefaB = dadosTarefas.find(t => t.nome === nomeB)
    
        const dataA  = new Date(`${tarefaA.data}T${tarefaA.hora}`)
        const dataB  = new Date(`${tarefaB.data}T${tarefaB.hora}`)
    
        return ordem === 'antigas' ? dataA - dataB : dataB - dataA
    
    })

    taskList.innerHTML = '<h2>Suas Tarefas<h2>'
    tarefas.forEach(tarefa => taskList.appendChild(tarefa))
}


const mostrarTarefasExcluidas = () => {
    const tarefaExcluidas = JSON.parse(localStorage.getItem('tarefasLixeira')) || [];

    const tarefasValidas = tarefaExcluidas.filter(tarefa => tarefa.nome);

    if (tarefasValidas.length === 0) {
        alert('Não há tarefas na lixeira');
        return;
    }

    let mensagem = 'Tarefas na lixeira:\n\n';

    tarefasValidas.forEach((tarefa, index) => {
        mensagem += `${index + 1}. ${tarefa.nome}\n`;
    });

    const resposta = prompt(mensagem + '\nDigite o número da tarefa que deseja restaurar (ou cancele para sair):');

    if (resposta && !isNaN(resposta)) {
        const index = parseInt(resposta) - 1;
        if (index >= 0 && index < tarefasValidas.length) {
            recuperarTarefas(tarefasValidas[index]);
        } else {
            alert('Número inválido!');
        }
    }
};





// const recuperarTarefas = () =>{
        
//         const tarefaLixeira = JSON.parse(localStorage.getItem('tarefasLixeira')) || [];
        
//         console.log(tarefaLixeira);
        
//     };
    
//     console.log(recuperarTarefas)
//     console.log(localStorage.getItem('tarefasLixeira'));
    


// document.querySelector('lixeiraBtn').addEventListener('click', function () {
    //     recuperarTarefas();


    const recuperarTarefas = (tarefaExcluida) => {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(tarefaExcluida);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    
        let tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasLixeira')) || [];
        tarefasExcluidas = tarefasExcluidas.filter(t => t.nome !== tarefaExcluida.nome);
        localStorage.setItem('tarefasLixeira', JSON.stringify(tarefasExcluidas));
    
        location.reload();
    };


