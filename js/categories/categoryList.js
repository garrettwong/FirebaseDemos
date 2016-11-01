angular.module('app').component('categoryList', {
    templateUrl: '/js/categories/categoryList.html',

    bindings: {
        categories: '='
    },

    controller: function () {
        console.log(this.categories);
        
        this.createNewCategory = function (){
            console.log(this.newCategoryName);
            
            this.categories.$add({
                name: this.newCategoryName
            });
            this.newCategoryName = '';
        }
    }
});