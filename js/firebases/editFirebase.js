angular.module('app').component('editFirebase', {
    templateUrl: '/js/firebases/editFirebase.html',
    bindings: {
        categories: '=',
        createNewFirebase: '&',
        editedFirebase: '=',
        updateFirebase: '&'
    },
    controller: function ($scope) {

        $scope.$watch('$ctrl.editedFirebase', (function (newData) {
            if (!!newData) {
                this.editing = true;
                this.amount = newData.amount;
                this.desc = newData.description;
                var date = new Date(newData.date);
                this.date = date.toLocaleDateString();
                this.selectedCategory = 
                    this.categories[this.categories.$indexFor(newData.category.id)];
                this.payee = newData.payee;
            }
        }).bind(this));

        this.setDefaults = function () {
            this.amount = '';
            this.desc = '';
            this.payee = '';
            this.date = new Date('3/3/1985').toLocaleDateString();
            this.selectedCategory = this.categories[0];
        };

        this.setDefaults();

        this.create = function () {
            this.firebaseData = {
                amount: parseFloat(this.amount),
                description: this.desc,
                payee: this.payee,
                category: { name: this.selectedCategory.name, id: this.selectedCategory.$id },
                date: new Date(this.date).toJSON()
            };

            this.setDefaults();

            // call function passed in via params
            console.log(this.firebaseData);
            this.createNewFirebase({firebaseData: this.firebaseData});
        };

        this.save = function () {
            console.log(this);

            this.editedFirebase.amount = parseFloat(this.amount);
            this.editedFirebase.payee = this.payee;
            this.editedFirebase.date = new Date(this.date).toJSON();
            this.editedFirebase.description = this.desc;
            this.editedFirebase.category = { name: this.selectedCategory.name, id: this.selectedCategory.$id };
            //save data
            this.updateFirebase();
            this.setDefaults();
            this.editing = false;
            this.editedFirebase = null;
        };

        this.cancel = function () {
            this.setDefaults();
            this.editing = false;
            this.editedFirebase = null;
        };

    }
});