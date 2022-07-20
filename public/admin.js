const watchesList = document.getElementById('watchesList');

const newWatches = document.getElementById('newWatches');

const container = document.getElementById('watches-container');

const noWatches = document.getElementById('noWatches');

watchesList.addEventListener('click', async (e) => {
  console.log(e.target.innerText);
  e.preventDefault();
  if (e.target.innerText === 'Удалить') {
    const row = e.target.closest('article');
    console.log('11211');
    const { id } = row.dataset;
    const response = await fetch(`/admin/${id}`, {
      method: 'delete',
    });
    console.log(response);
    if (response.ok) {
      row.remove();
    }
  }
});

newWatches.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(newWatches);

  const response = await fetch('/admin', {
    method: 'post',
    body: formData,
  });

  if (response.ok) {
    const result = await response.json();
    container.insertAdjacentHTML('afterbegin', `
     <article data-id ="${result.newWatches.id}" id="${result.newWatches.id}"">
     <div class="allWatches">
     <p>
         <span class='name'>${result.newWatches.name ? result.newWatches.name : 'вы не добавили название модели'}</span>
         <span class='name'>${result.newWatches.description ? result.newWatches.description : 'вы не добавили описание модели'}</span>
         <img width=100 class='photo' src='/watchesUploads/${result.newWatches.photo}'/>
         <span class='likes'>${result.newWatches.likes ? result.newWatches.likes : 'еще нет лайков'}</span>
     </p>
         <button type="submit" name="deleteWatches" class="deleteWatches"> Удалить </button>
     </div>
 </article>
    `);
    noWatches.remove();
  }
});
