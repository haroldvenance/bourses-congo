// Sauvegarde d'une fiche (LocalStorage)
document.addEventListener('DOMContentLoaded', function() {
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const titre = this.getAttribute('data-titre');
            const date = this.getAttribute('data-date');
            const conditions = this.getAttribute('data-conditions');
            const url = window.location.href;
            
            let saved = JSON.parse(localStorage.getItem('bourses_saved')) || [];
            // Vérifier si déjà sauvegardée
            const exists = saved.some(item => item.url === url);
            if (!exists) {
                saved.push({ titre, date, conditions, url });
                localStorage.setItem('bourses_saved', JSON.stringify(saved));
                alert('✅ Fiche sauvegardée ! Vous pourrez la consulter hors ligne dans "Mes fiches".');
            } else {
                alert('ℹ️ Cette fiche est déjà dans vos sauvegardes.');
            }
        });
    });
    
    // Boutons de partage WhatsApp
    const shareButtons = document.querySelectorAll('.btn-share');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const titre = this.getAttribute('data-titre');
            const url = this.getAttribute('data-url') || window.location.href;
            const message = `📘 *${titre}*%0A%0AConsultez les détails : ${url}%0A%0ASource : Bourses Congo (site communautaire)`;
            window.open(`https://wa.me/?text=${message}`, '_blank');
        });
    });
});
