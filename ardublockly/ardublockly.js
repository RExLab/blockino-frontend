/* global ArdublocklyServer */

/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview General javaScript for Arduino app with material design.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.toolbox_names = [];
/** Initialize function for Ardublockly on page load. */
window.addEventListener('load', function load(event) {
    window.removeEventListener('load', load, false);
    Ardublockly.setHtmlLang();
    Ardublockly.injectBlockly(document.getElementById('content_blocks'), 'ardublockly_toolbox.xml');
    Ardublockly.designJsInit();
    Ardublockly.bindDesignEventListeners();
    Ardublockly.bindActionFunctions();
    Ardublockly.bindBlocklyEventListeners();
    Ardublockly.largeIdeButtonSpinner(true);
    ArdublocklyServer.initServerComm();
});

/** Binds functions to each of the buttons, nav links, and related. */
Ardublockly.bindActionFunctions = function () {
    // Navigation buttons
    ;
    Ardublockly.bindClick_('button_save_sketch', Ardublockly.saveSketchFileAs);


    // Side menu buttons, they also close the side menu
    Ardublockly.bindClick_('menu_load', function () {
        Ardublockly.loadUserXmlFile();
        $('.button-collapse').sideNav('hide');
    });
    Ardublockly.bindClick_('menu_save', function () {
        Ardublockly.saveXmlFileAs();
        $('.button-collapse').sideNav('hide');
    });
    Ardublockly.bindClick_('menu_delete', function () {
        Ardublockly.discardAllBlocks();
        $('.button-collapse').sideNav('hide');
    });

    Ardublockly.bindClick_('menu_example_1', function () {
        Ardublockly.loadServerXmlFile('../examples/blink.xml');
        $('.button-collapse').sideNav('hide');
    });
    Ardublockly.bindClick_('menu_example_2', function () {
        Ardublockly.loadServerXmlFile('../examples/serial_print_ascii_.xml');
        $('.button-collapse').sideNav('hide');
    });
    Ardublockly.bindClick_('menu_example_3', function () {
        Ardublockly.loadServerXmlFile('../examples/serial_repeat_game.xml');
        $('.button-collapse').sideNav('hide');
    });
    Ardublockly.bindClick_('menu_example_4', function () {
        Ardublockly.loadServerXmlFile('../examples/servo_knob.xml');
        $('.button-collapse').sideNav('hide');
    });
    Ardublockly.bindClick_('menu_example_5', function () {
        Ardublockly.loadServerXmlFile('../examples/hall.xml');
        $('.button-collapse').sideNav('hide');
    });

    Ardublockly.bindClick_('button_ide_large', function () {
        Ardublockly.ideButtonLargeAction();
    });
    Ardublockly.bindClick_('button_ide_middle', function () {
        Ardublockly.ideButtonMiddleAction();
    });
    Ardublockly.bindClick_('button_ide_left', function () {
        Ardublockly.ideButtonLeftAction();
    });

    Ardublockly.bindClick_('button_toggle_toolbox', Ardublockly.toogleToolbox);

    Ardublockly.bindClick_('button_pt', function () {
        Ardublockly.changeLanguage('pt-br');
        $('.button-collapse').sideNav('hide');

    });
    Ardublockly.bindClick_('button_en', function () {
        Ardublockly.changeLanguage('en');
        $('.button-collapse').sideNav('hide');
    });
    Ardublockly.bindClick_('button_es', function () {
        Ardublockly.changeLanguage('es');
        $('.button-collapse').sideNav('hide');
    });



};

Ardublockly.changeLanguage = function (lang) {
    Blockly.Msg = [];
    $.getScript('../blockly/msg/js/' + lang + '.js', function () {
        console.log(lang + ' loaded');
        Ardublockly.setHtmlLang();
        Ardublockly.sketchNameSizeEffect();
        Ardublockly.loadToolboxNames();
    });

};

Ardublockly.loadToolboxNames = function () {
    for (var i = 0; i < Ardublockly.toolbox_names.length; i++) {
        $('span.blocklyTreeLabel')[i + 1].innerHTML = Blockly.Msg[Ardublockly.toolbox_names[i]];
    }

};

/** Sets the Ardublockly server IDE setting to upload and sends the code. */
Ardublockly.ideSendUpload = function () {
    // Check if this is the currently selected option before edit sever setting
    if (Ardublockly.ideButtonLargeAction !== Ardublockly.ideSendUpload) {
        Ardublockly.showExtraIdeButtons(false);
        Ardublockly.setIdeSettings(null, 'upload');
    }
    Materialize.toast(Blockly.Msg.requesting, 10000);
    Ardublockly.resetIdeOutputContent();
    Ardublockly.uploadCode();
};

/** Sets the Ardublockly server IDE setting to verify and sends the code. */
Ardublockly.ideSendVerify = function () {
    // Check if this is the currently selected option before edit sever setting
    if (Ardublockly.ideButtonLargeAction !== Ardublockly.ideSendVerify) {
        Ardublockly.showExtraIdeButtons(false);
        Ardublockly.setIdeSettings(null, 'verify');
    }
    Materialize.toast(Blockly.Msg.verifying, 5000);
    Ardublockly.resetIdeOutputContent();
    Ardublockly.sendCode();
};




/** Sets the Ardublockly server IDE setting to open and sends the code. */
Ardublockly.ideSendOpen = function () {
    // Check if this is the currently selected option before edit sever setting
    if (Ardublockly.ideButtonLargeAction !== Ardublockly.ideSendOpen) {
        Ardublockly.showExtraIdeButtons(false);
        Ardublockly.setIdeSettings(null, 'open');
    }

    if ($("#painelblockly").hasClass('l12')) {

        $("#painelblockly").removeClass('l12');
        $("#painelblockly").addClass('l8');
        $("#codeDiv").show();
        if (ArdublocklyServer.myturn)
            $("#debugDiv").show();

    } else {
        $("#painelblockly").removeClass('l8');
        $("#painelblockly").addClass('l12');
        $("#codeDiv").hide();
        $("#debugDiv").hide();

    }
    Ardublockly.displayToolbox(true);
};

/** Function bound to the left IDE button, to be changed based on settings. */
Ardublockly.ideButtonLargeAction = Ardublockly.ideSendVerify;

/** Function bound to the middle IDE button, to be changed based on settings. */
Ardublockly.ideButtonMiddleAction = Ardublockly.ideSendUpload;

/** Function bound to the large IDE button, to be changed based on settings. */
Ardublockly.ideButtonLeftAction = Ardublockly.ideSendOpen;

/** Initialises the IDE buttons with the default option from the server. */


/**
 * Changes the IDE launch buttons based on the option indicated in the argument.
 * @param {!string} value One of the 3 possible values from the drop down select
 *                        in the settings modal: 'upload', 'verify', or 'open'.
 */
Ardublockly.changeIdeButtons = function (value) {
    console.log(value);
    if (value === 'upload') {
        Ardublockly.changeIdeButtonsDesign(value);
        Ardublockly.ideButtonLeftAction = Ardublockly.ideSendOpen;
        Ardublockly.ideButtonMiddleAction = Ardublockly.ideSendVerify;
        Ardublockly.ideButtonLargeAction = Ardublockly.ideSendUpload;

    } else if (value === 'verify') {
        Ardublockly.changeIdeButtonsDesign(value);
        Ardublockly.ideButtonLeftAction = Ardublockly.ideSendOpen;
        Ardublockly.ideButtonMiddleAction = Ardublockly.ideSendUpload;
        Ardublockly.ideButtonLargeAction = Ardublockly.ideSendVerify;
    } else if (value === 'open') {
        Ardublockly.changeIdeButtonsDesign(value);
        Ardublockly.ideButtonLeftAction = Ardublockly.ideSendVerify;
        Ardublockly.ideButtonMiddleAction = Ardublockly.ideSendUpload;
        Ardublockly.ideButtonLargeAction = Ardublockly.ideSendOpen;
    }
};

/**
 * Loads an XML file from the server and adds the blocks into the Blockly
 * workspace.
 * @param {!string} xmlFile Server location of the XML file to load.
 */
Ardublockly.loadServerXmlFile = function (xmlFile) {
    // The loadXmlBlockFile loads the file asynchronously and needs a callback
    var loadXmlCallback = function (sucess) {
        if (sucess) {
            Ardublockly.renderContent();
        } else {
            Ardublockly.materialAlert(
                    'XML inválido',
                    'O arquivo XML não foi convertido em blocos com sucesso. ' +
                    'Por favor, rever o código XML e tentar novamente.',
                    false);
        }
    };
    var callbackConnectionError = function () {
        Ardublockly.openNotConnectedModal();
    };
    Ardublockly.loadXmlBlockFile(
            xmlFile, loadXmlCallback, callbackConnectionError);
};

/**
 * Loads an XML file from the users file system and adds the blocks into the
 * Blockly workspace.
 */
Ardublockly.loadUserXmlFile = function () {
    // Create event listener function
    var parseInputXMLfile = function (e) {
        var files = e.target.files;
        var reader = new FileReader();
        reader.onload = function () {
            var success = Ardublockly.replaceBlocksfromXml(reader.result);
            if (success) {
                Ardublockly.renderContent();
            } else {
                Ardublockly.materialAlert(
                        'XML inválido',
                        'O arquivo XML não foi convertido em blocos com sucesso. ' +
                        'Por favor, rever o código XML e tentar novamente.',
                        false);
            }
        };
        reader.readAsText(files[0]);
    };
    // Create once invisible browse button with event listener, and click it
    var selectFile = document.getElementById('select_file');
    if (selectFile == null) {
        var selectFileDom = document.createElement('INPUT');
        selectFileDom.type = 'file';
        selectFileDom.id = 'select_file';

        var selectFileWrapperDom = document.createElement('DIV');
        selectFileWrapperDom.id = 'select_file_wrapper';
        selectFileWrapperDom.style.display = 'none';
        selectFileWrapperDom.appendChild(selectFileDom);

        document.body.appendChild(selectFileWrapperDom);
        selectFile = document.getElementById('select_file');
        selectFile.addEventListener('change', parseInputXMLfile, false);
    }
    selectFile.click();
};

/**
 * Creates an XML file containing the blocks from the Blockly workspace and
 * prompts the users to save it into their local file system.
 */
Ardublockly.saveXmlFileAs = function () {
    var xmlName = document.getElementById('sketch_name').value;
    var blob = new Blob(
            [Ardublockly.generateXml()],
            {type: 'text/plain;charset=utf-8'});
    saveAs(blob, xmlName + '.xml');
};

/**
 * Creates an Arduino Sketch file containing the Arduino code generated from
 * the Blockly workspace and prompts the users to save it into their local file
 * system.
 */
Ardublockly.saveSketchFileAs = function () {
    var sketchName = document.getElementById('sketch_name').value;
    var blob = new Blob(
            [Ardublockly.generateArduino()],
            {type: 'text/plain;charset=utf-8'});
    saveAs(blob, sketchName + '.ino');
};

/** Prepares and opens the settings modal. */
Ardublockly.openSettings = function () {
    Ardublockly.populateSettings();
    Ardublockly.openSettingsModal();
};

/**
 * Retrieves the Settings from ArdublocklyServer and populates the form data
 * for the Settings modal dialog.
 */
Ardublockly.populateSettings = function () {
    ArdublocklyServer.requestCompilerLocation(
            Ardublockly.setCompilerLocationHtml);
    ArdublocklyServer.requestSketchLocation(Ardublockly.setSketchLocationHtml);
    ArdublocklyServer.requestArduinoBoards(Ardublockly.setArduinoBoardsHtml);
    ArdublocklyServer.requestSerialPorts(Ardublockly.setSerialPortsHtml);
    ArdublocklyServer.requestIdeOptions(Ardublockly.setIdeHtml);
};

/**
 * Sets the compiler location form data retrieve from an updated element.
 * @param {element} jsonResponse JSON data coming back from the server.
 */
Ardublockly.setCompilerLocationHtml = function (jsonResponse) {
    if (jsonResponse != null) {
        var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
        var compLocIp = document.getElementById('settings_compiler_location');
        if (compLocIp != null) {
            compLocIp.value = newEl.value;
        }
    } else {
        // If the element is Null, then Ardublockly server is not running
        Ardublockly.openNotConnectedModal();
    }
};

/**
 * Sets the sketch location form data retrieve from an updated element.
 * @param {element} jsonResponse JSON data coming back from the server.
 */
Ardublockly.setSketchLocationHtml = function (jsonResponse) {
    if (jsonResponse != null) {
        var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
        var sketchLocIp = document.getElementById('settings_sketch_location');
        if (sketchLocIp != null) {
            sketchLocIp.value = newEl.value;
        }
    } else {
        // If the element is Null, then Ardublockly server is not running
        Ardublockly.openNotConnectedModal();
    }
};

/**
 * Replaces the Arduino Boards form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} jsonResponse JSON data coming back from the server.
 */
Ardublockly.setArduinoBoardsHtml = function (jsonResponse) {
    if (jsonResponse != null) {
        var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
        var boardDropdown = document.getElementById('board');
        if (boardDropdown != null) {
            // Restarting the select elements built by materialize
            $('select').material_select('destroy');
            newEl.name = 'settings_board';
            newEl.id = 'board';
            newEl.onchange = Ardublockly.setBoard;
            boardDropdown.parentNode.replaceChild(newEl, boardDropdown);
            // Refresh the materialize select menus
            $('select').material_select();
        }
    } else {
        // If the element is Null, then Ardublockly server is not running
        Ardublockly.openNotConnectedModal();
    }
};

/**
 * Sets the Arduino Board type with the selected user input from the drop down.
 */
Ardublockly.setBoard = function () {
    var el = document.getElementById('board');
    var boardValue = el.options[el.selectedIndex].value;
    //TODO: check how ArdublocklyServer deals with invalid data and sanitise
    ArdublocklyServer.setArduinoBoard(
            boardValue, Ardublockly.setArduinoBoardsHtml);
    Ardublockly.changeBlocklyArduinoBoard(boardValue.toLowerCase());
};

/**
 * Replaces the Serial Port form data with a new HTMl element.
 * Ensures there is a change listener to call 'setSerialPort' function
 * @param {element} jsonResponse JSON data coming back from the server.
 */
Ardublockly.setSerialPortsHtml = function (jsonResponse) {
    if (jsonResponse !== null) {
        var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
        var serialDropdown = document.getElementById('serial_port');
        if (serialDropdown !== null) {
            // Restarting the select elements built by materialize
            $('select').material_select('destroy');
            newEl.name = 'settings_serial';
            newEl.id = 'serial_port';
            newEl.onchange = Ardublockly.setSerial;
            serialDropdown.parentNode.replaceChild(newEl, serialDropdown);
            // Refresh the materialize select menus
            $('select').material_select();
        }
    } else {
        // If the element is Null, then Ardublockly server is not running
        Ardublockly.openNotConnectedModal();
    }
};

/**
 * Sets the Serial Port with the selected user input from the drop down.
 */
Ardublockly.setSerial = function () {
    var el = document.getElementById('serial_port');
    var serialValue = el.options[el.selectedIndex].value;
    //TODO: check how ArdublocklyServer deals with invalid data and sanitise
    ArdublocklyServer.setSerialPort(
            serialValue, Ardublockly.setSerialPortsHtml);
};




Ardublockly.Collapsable = function (id, open) {

    if (open == true) {
        $("#" + id + " li").first().addClass('active');
        $("#" + id + " div.collapsible-header").first().addClass('active');
        $("#" + id + " div.collapsible-body").first().addClass('active');
        $("#" + id + " div.collapsible-body").first().show();

    } else {
        $("#" + id + " li").first().removeClass('active');
        $("#" + id + " div.collapsible-header").first().removeClass('active');
        $("#" + id + " div.collapsible-body").first().removeClass('active');
        $("#" + id + " div.collapsible-body").first().hide();
    }

}


Ardublockly.setupDebugPanel = function (jsonParsed) {
    ArdublocklyServer.myturn = jsonParsed.myturn;
    if (jsonParsed.myturn == true) {
        $("#debugDiv img").attr('src', jsonParsed.video);
        Ardublockly.Collapsable('codeDiv', false);
        $("#debugDiv").show();
        Materialize.toast(Blockly.Msg[jsonParsed.output], jsonParsed.timeslice);
        $("#command_serial").val("");
        $("#codeDiv .active").removeClass('active');

    } else {
        $("#debugDiv").hide();
        $("#debugDiv img").attr('src', '');
        Ardublockly.Collapsable('codeDiv', true);
        Materialize.toast(Blockly.Msg[jsonParsed.output], 15000);

    }

    Ardublockly.openDebugReturn();
}

/**
 * Replaces IDE options form data with a new HTMl element.
 * Ensures there is a change listener to call 'setIdeSettings' function
 * @param {element} jsonResponse JSON data coming back from the server.
 */
Ardublockly.setIdeHtml = function (jsonResponse) {
    if (jsonResponse != null) {
        var newEl = ArdublocklyServer.createElementFromJson(jsonResponse);
        var ideDropdown = document.getElementById('ide_settings');
        if (ideDropdown != null) {
            // Restarting the select elements built by materialize
            $('select').material_select('destroy');
            newEl.name = 'settings_ide';
            newEl.id = 'ide_settings';
            newEl.onchange = Ardublockly.setIdeSettings;
            ideDropdown.parentNode.replaceChild(newEl, ideDropdown);
            // Refresh the materialize select menus
            $('select').material_select();
        }
    } else {
        // If the element is Null, then Ardublockly server is not running
        Ardublockly.openNotConnectedModal();
    }
};

/**
 * Sets the IDE settings data with the selected user input from the drop down.
 * @param {Event} e Event that triggered this function call. Required for link
 *                  it to the listeners, but not used.
 * @param {string} preset A value to set the IDE settings bypassing the drop
 *                        down selected value. Valid data: 'upload', 'verify',
 *                        or 'open'.
 */
Ardublockly.setIdeSettings = function (e, preset) {
    if (preset !== undefined) {
        var ideValue = preset;
    } else {
        var el = document.getElementById('ide_settings');
        var ideValue = el.options[el.selectedIndex].value;
    }
    Ardublockly.changeIdeButtons(ideValue);
    //TODO: check how ArdublocklyServer deals with invalid data and sanitise here
};

/**
 * Send the Arduino Code to the ArdublocklyServer to process.
 * Shows a loader around the button, blocking it (unblocked upon received
 * message from server).
 */
Ardublockly.sendCode = function () {
    Ardublockly.largeIdeButtonSpinner(true);
    ArdublocklyServer.sendSketchToServer(
            Ardublockly.generateArduino(), Ardublockly.sendCodeReturn);
};

Ardublockly.uploadCode = function () {
    Ardublockly.largeIdeButtonSpinner(true);
    ArdublocklyServer.uploadSketchToServer(Ardublockly.generateArduino());
};


Ardublockly.openDebug = function () {
    Ardublockly.largeIdeButtonSpinner(true);
    ArdublocklyServer.openDebugServer(Ardublockly.setupDebugPanel);
};

/**
 * Receives the IDE data back to be displayed and stops spinner.
 * @param {element} jsonResponse JSON data coming back from the server.
 */
Ardublockly.sendCodeReturn = function (jsonResponse) {
    Ardublockly.largeIdeButtonSpinner(false);
    if (jsonResponse != null) {
        var dataBack = ArdublocklyServer.createElementFromJson(jsonResponse);
        Ardublockly.arduinoIdeOutput(dataBack);
        Ardublockly.changeIdeButtons('upload');

    } else {
        Ardublockly.openNotConnectedModal();
    }
};

Ardublockly.uploadCodeReturn = function (jsonResponse) {
    Ardublockly.largeIdeButtonSpinner(false);
    if (jsonResponse != null) {
        var dataBack = ArdublocklyServer.createElementFromJson(jsonResponse);
        Ardublockly.arduinoIdeOutput(dataBack);
        Ardublockly.changeIdeButtons('verify');

    } else {
        // If the element is Null, then Ardublockly server is not running
        Ardublockly.openNotConnectedModal();
    }
};

Ardublockly.openDebugReturn = function () {
    Ardublockly.largeIdeButtonSpinner(false);
    Ardublockly.changeIdeButtons('verify');

};

/** Populate the workspace blocks with the XML written in the XML text area. */
Ardublockly.XmlTextareaToBlocks = function () {
    var success = Ardublockly.replaceBlocksfromXml(
            document.getElementById('content_xml').value);
    if (success) {
        Ardublockly.renderContent();
    } else {
        Ardublockly.materialAlert(
                'XML inválido',
                'O arquivo XML não foi convertido em blocos com sucesso. ' +
                'Por favor, rever o código XML e tentar novamente.',
                false);
    }
};

/**
 * Private variable to save the previous version of the Arduino Code.
 * @type {!String}
 * @private
 */
Ardublockly.PREVIOUS_ARDUINO_CODE_ =
        'void setup() {\n\n}\n\n\nvoid loop() {\n\n}';

/**
 * Populate the Arduino Code and Blocks XML panels with content generated from
 * the blocks.
 */
Ardublockly.renderContent = function () {
    // Only regenerate the code if a block is not being dragged
    if (Ardublockly.blocklyIsDragging()) {
        return;
    }

    // Render Arduino Code with latest change highlight and syntax highlighting
    var arduinoCode = Ardublockly.generateArduino();
    if (arduinoCode !== Ardublockly.PREVIOUS_ARDUINO_CODE_) {
        var arduinoContent = document.getElementById('content_arduino');
        // Sets content in case of no pretify and serves as a fast way to scape html
        arduinoContent.textContent = arduinoCode;
        arduinoCode = arduinoContent.innerHTML;
        if (typeof prettyPrintOne == 'function') {
            var diff = JsDiff.diffWords(Ardublockly.PREVIOUS_ARDUINO_CODE_,
                    arduinoCode);
            var resultStringArray = [];
            for (var i = 0; i < diff.length; i++) {
                if (diff[i].added) {
                    resultStringArray.push(
                            '<span class="code_highlight_new">' + diff[i].value + '</span>');
                } else if (!diff[i].removed) {
                    resultStringArray.push(diff[i].value);
                }
            }
            var codeHtml = prettyPrintOne(resultStringArray.join(''), 'cpp', false);
            arduinoContent.innerHTML = codeHtml;
        }
        Ardublockly.PREVIOUS_ARDUINO_CODE_ = arduinoCode;
    }

    // Generate plain XML into element
    var xmlContent = document.getElementById('content_xml');
    xmlContent.value = Ardublockly.generateXml();
};

/**
 * Private variable to indicate if the toolbox is meant to be shown.
 * @type {!boolean}
 * @private
 */
Ardublockly.TOOLBAR_SHOWING_ = true;

/**
 * Toggles the blockly toolbox and the Ardublockly toolbox button On and Off.
 * Uses namespace member variable TOOLBAR_SHOWING_ to toggle state.
 */
Ardublockly.toogleToolbox = function () {
    if (Ardublockly.TOOLBAR_SHOWING_) {
        Ardublockly.blocklyCloseToolbox();
        Ardublockly.displayToolbox(false);
    } else {
        Ardublockly.displayToolbox(true);
    }
    Ardublockly.TOOLBAR_SHOWING_ = !Ardublockly.TOOLBAR_SHOWING_;
};

/**
 * Returns a boolean indicating if the toolbox is currently visible.
 * @return {boolean} Indicates if the toolbox is currently visible.
 */
Ardublockly.isToolboxVisible = function () {
    return Ardublockly.TOOLBAR_SHOWING_;
};

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!function} func Event handler to bind.
 * @private
 */
Ardublockly.bindClick_ = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    // Need to ensure both, touch and click, events don't fire for the same thing
    var propagateOnce = function (e) {
        e.stopPropagation();
        e.preventDefault();
        func();
    };
    el.addEventListener('ontouchend', propagateOnce);
    el.addEventListener('click', propagateOnce);
};

/**
 * Populate the currently selected panel with content generated from the blocks.
 */
Ardublockly.functionNotImplemented = function () {
    Materialize.toast('Função não implementada ainda', 4000);
};
