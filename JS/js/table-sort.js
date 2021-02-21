window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    class UserList {
        constructor() {
            this.table = document.querySelector('.table')
        }

        async getUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) throw new Error('Ошибка сети')

                const data = await response.json()
                console.log('Load!')

                return data
            } catch (error) {
                throw new Error('Не удалось получить данные от сервера')
            }
        }
    }

    const load = async () => {
        const userList = new UserList()
        try {
            const users = await userList.getUsers()
            console.log(users)
        } catch (error) {
            console.log(error)
        }
    }

    document.getElementById('load-button').addEventListener('click', () => {
        console.log('Loading...')
        load()
    })
})

/*
<div class="tr">
            <div class="td"><span class="name-icon" style="background: #fae3cd;">LG</span> Leanne Graham</div>
            <div class="td">Bret</div>
            <div class="td">Sincere@april.biz</div>
            <div class="td">Romaguera-Crona</div>
        </div>
*/
