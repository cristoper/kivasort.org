$(document).ready(function () {
    var table = $('#KivaSort').makeKivaTable({
        deferRender: true,
        responsive: true,
        fixedHeader: true,
        lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
        dom: 'Bftip',
        colReorder: true,
        language: {
            buttons: {
                pageLength: { '-1': "Show all rows", _: "Show %d rows/page" }
            }
        },
        buttons: [ 'pageLength',
            'colvis',  
            { extend: 'collection', text: 'Export',
                buttons: [ {extend: 'copy', text: 'Copy to Clipboard'},
                    { extend: 'csv', text: 'Save as CSV'},
                    { extend: 'pdf', text: 'Save as PDF'} ]
            }],

            /* Sort by Portfolio Yield, then Profitability */
            order: [[2, "asc"], [3, "asc"], [4, "desc"], [5, "desc"]]
    }).DataTable();


    $('#tabs').tabs({
        activate: function(e, ui) {
            if (ui.newTab.is($('#fpd_link'))) {
                // If the user is on a different tab when the table data loads,
                // then the Responsive plugin will not calculate column widths
                // correctly. So we recalculate them when the tab becomes
                // visible.
                table.responsive.recalc();

                // Re-enable the fixed header
                table.fixedHeader.enable(true);
            } else {
                // remove fixed header when viewing other tabs
                table.fixedHeader.enable(false);
            }
        }
    });

    table.on('processing.dt', function() {
        // Initially hide/show incomplete rows based on HTML
        toggleIncomplete($('#hideIncomplete').is(':checked'));
        toggleInactive($('#hideInactive').is(':checked'));
    });

    // hide/show incomplete rows whenever checkbox is clicked
    $('#hideIncomplete').click(function() {
        toggleIncomplete(this.checked);
    });

    // hide/show inactive rows whenever checkbox is clicked
    $('#hideInactive').click(function() {
        toggleInactive(this.checked);
    });

    function toggleIncomplete(isChecked) {
        if (isChecked) {
            table.columns('th').search('^(?!-$)', true, false).draw();
        } else{
            table.columns('th').search('.', true).draw();
        }
    }

    function toggleInactive(isChecked) {
        if (isChecked) {
            table.columns('#statusCol').search('^active', true).draw();
        } else {
            table.columns('#statusCol').search('.', true).draw();
        }
    }

});
