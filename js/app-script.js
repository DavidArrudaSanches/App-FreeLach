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
        <h3>
        `
    }
}