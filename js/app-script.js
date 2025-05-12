const definirSaudacao= ()=>{
    const header = document.querySelector('#saudacaoHeader');
    setInterval(()=>{
        const now = new Date ();
        const horas = now.getHours();
        const minutos = now.getMinutes()
        const segundos = now.getSeconds()
        const dataAtual = now.toLocaleDateString('pt-BR')
        
            let saudacao;
            if (horas >= 6 && horas <12){
                saudacao = 'Bom dia!';
            }else if(horas >= 12 && horas <18){
                saudacao='Boa Tarde';
            }else{
                saudacaoa='Boa noite!'
            }
        
            header.innerHTML = `<span>${saudacao}</span><span>${dataAtual} ${horas}:${minutos}:${segundos}</span>`
    }, 1000
)
}
definirSaudacao()

const carregarTarefas = ()=>{
    const taskList = document.querySelector('#taskList')
    taskItem.classList.add('task-Item')
    if (tarefa.concluida){
        taskItem.classList.add('concluida')
    }
    taskItem.innerHTML = tarefa.html
    taskList.appendChild(taskItem)

    taskItem.querySelector('.complete-btn').addEventListener('click', function(){
        marcarComoConcluida(this)
    })
    
    taskItem.querySelector('.edit-btn').addEventListener('click', function(){
        editarTarefa(this)
    })
    
    taskItem.querySelector('.delete-btn').addEventListener('click', function(){
        excluirTarefa(this)
    })
}

const adicionarTarefa = () => {
    const taskName=document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDescription').value
    const taskDate = document.querySelector('#taskDate').value
    const taskTime = document.querySelector('#taskTime').value

    if(taskName && taskDate && taskTime){
        const taskList = document.querySelector('#taskList')

        const taskItem = document.createElement('div')
        taskItem.classList.add('task-item')


        const dataFormatada = new Date(taskData).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        })

        const taskHTML = 
        `
        <h3>${taskName}</h3>
        <p>${taskDescription}</p>
        <p><strong>${taskDate}</strong>${taskTime}</p>
         <div class="task-actions">
                <button class="complete-btn">Concluir</button>
                <button class="edit-btn">Editar</button>
                <button class="delet-btn">Excluir</button>
         </div>
        `

        taskItem.querySelector('.complete-btn').addEventListener('click', function(){
            marcarComoConcluida(this)
        })
        
        taskItem.querySelector('.edit-btn').addEventListener('click', function(){
            editarTarefa(this)
        })
        
        taskItem.querySelector('.delete-btn').addEventListener('click', function(){
            excluirTarefa(this)
        })

        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
        tarefas.push({
            nome:taskName,
            description:taskDescription,
            data: taskDate,
            hora:taskTime,
            html:taskHTML

        })

        localStorage.setItem('tarefas', JSON.stringify(tarefas))
        alert('Tarefa adicionada com sucesso!')
        document.querySelector('#taskForm').reset();
    }else{
        alert('Por favor, preencha todos os campos obrigatórios')
    }
}

window.onload = function(){
    definirSaudacao()
    carregarTarefas()

    document.querySelector('#adicionarTarefaBtn').addEventListener('click', function(e){
        e.preventDefault();
        adicionarTarefa();

    })
    document.querySelector('#filtrarTodasBtn').addEventListener('click', ()=> filtrarTarefas('todas'))
    document.querySelector('#filtrarPendentesBtn').addEventListener('click', () =>filtrarTarefas)
}