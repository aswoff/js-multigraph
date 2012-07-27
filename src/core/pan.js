window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.pan),
        Pan = new window.jermaine.Model( "Pan", function () {
        this.hasA("allowed").which.validatesWith(function (allowed) {
            return allowed === "yes" || allowed === "no";
        });
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === "string";
        });
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === "string";
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.pan, attributes);
    });

    ns.Pan = Pan;

});
