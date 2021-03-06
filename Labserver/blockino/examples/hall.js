'use strict';

var Blockino = Blockino || {};

Blockino.examples['examples/hall.js'] =  '<xml xmlns="http://www.w3.org/1999/xhtml">'+
                                           '<block type="variables_set" id="5" x="60" y="13">'+
                                             '<field name="VAR">hall</field>'+
                                             '<value name="VALUE">'+
                                               '<block type="io_digitalread" id="6">'+
                                                 '<field name="PIN">7</field>'+
                                               '</block>'+
                                             '</value>'+
                                             '<next>'+
                                               '<block type="controls_for" id="7">'+
                                                 '<field name="VAR">i</field>'+
                                                 '<value name="FROM">'+
                                                   '<block type="math_number" id="8">'+
                                                     '<field name="NUM">0</field>'+
                                                   '</block>'+
                                                 '</value>'+
                                                 '<value name="TO">'+
                                                   '<block type="math_number" id="9">'+
                                                     '<field name="NUM">180</field>'+
                                                   '</block>'+
                                                 '</value>'+
                                                 '<value name="BY">'+
                                                   '<block type="math_number" id="10">'+
                                                     '<field name="NUM">1</field>'+
                                                   '</block>'+
                                                 '</value>'+
                                                 '<statement name="DO">'+
                                                   '<block type="servo_write" id="11">'+
                                                     '<field name="SERVO_PIN">6</field>'+
                                                     '<value name="SERVO_ANGLE">'+
                                                       '<block type="variables_get" id="12">'+
                                                         '<field name="VAR">i</field>'+
                                                       '</block>'+
                                                     '</value>'+
                                                     '<next>'+
                                                       '<block type="time_delay" id="13">'+
                                                         '<value name="DELAY_TIME_MILI">'+
                                                           '<block type="math_number" id="14">'+
                                                             '<field name="NUM">15</field>'+
                                                           '</block>'+
                                                         '</value>'+
                                                         '<next>'+
                                                           '<block type="controls_if" id="15">'+
                                                             '<mutation else="1"></mutation>'+
                                                             '<value name="IF0">'+
                                                               '<block type="logic_compare" id="16">'+
                                                                 '<field name="OP">EQ</field>'+
                                                                 '<value name="A">'+
                                                                   '<block type="variables_get" id="17">'+
                                                                     '<field name="VAR">hall</field>'+
                                                                   '</block>'+
                                                                 '</value>'+
                                                                 '<value name="B">'+
                                                                   '<block type="io_highlow" id="18">'+
                                                                     '<field name="STATE">LOW</field>'+
                                                                   '</block>'+
                                                                 '</value>'+
                                                               '</block>'+
                                                             '</value>'+
                                                             '<statement name="DO0">'+
                                                               '<block type="io_digitalwrite" id="19">'+
                                                                 '<field name="PIN">4</field>'+
                                                                 '<value name="STATE">'+
                                                                   '<block type="io_highlow" id="20">'+
                                                                     '<field name="STATE">HIGH</field>'+
                                                                   '</block>'+
                                                                 '</value>'+
                                                               '</block>'+
                                                             '</statement>'+
                                                             '<statement name="ELSE">'+
                                                               '<block type="io_digitalwrite" id="21">'+
                                                                 '<field name="PIN">4</field>'+
                                                                 '<value name="STATE">'+
                                                                   '<block type="io_highlow" id="22">'+
                                                                     '<field name="STATE">LOW</field>'+
                                                                   '</block>'+
                                                                 '</value>'+
                                                               '</block>'+
                                                             '</statement>'+
                                                           '</block>'+
                                                         '</next>'+
                                                       '</block>'+
                                                     '</next>'+
                                                   '</block>'+
                                                 '</statement>'+
                                                 '<next>'+
                                                   '<block type="controls_for" id="23">'+
                                                     '<field name="VAR">i</field>'+
                                                     '<value name="FROM">'+
                                                       '<block type="math_number" id="24">'+
                                                         '<field name="NUM">180</field>'+
                                                       '</block>'+
                                                     '</value>'+
                                                     '<value name="TO">'+
                                                       '<block type="math_number" id="25">'+
                                                         '<field name="NUM">0</field>'+
                                                       '</block>'+
                                                     '</value>'+
                                                     '<value name="BY">'+
                                                       '<block type="math_number" id="26">'+
                                                         '<field name="NUM">-1</field>'+
                                                       '</block>'+
                                                     '</value>'+
                                                     '<statement name="DO">'+
                                                       '<block type="servo_write" id="27">'+
                                                         '<field name="SERVO_PIN">6</field>'+
                                                         '<value name="SERVO_ANGLE">'+
                                                           '<block type="variables_get" id="28">'+
                                                             '<field name="VAR">i</field>'+
                                                           '</block>'+
                                                         '</value>'+
                                                         '<next>'+
                                                           '<block type="time_delay" id="29">'+
                                                             '<value name="DELAY_TIME_MILI">'+
                                                               '<block type="math_number" id="30">'+
                                                                 '<field name="NUM">15</field>'+
                                                               '</block>'+
                                                             '</value>'+
                                                             '<next>'+
                                                               '<block type="controls_if" id="31">'+
                                                                 '<mutation else="1"></mutation>'+
                                                                 '<value name="IF0">'+
                                                                   '<block type="logic_compare" id="32">'+
                                                                     '<field name="OP">EQ</field>'+
                                                                     '<value name="A">'+
                                                                       '<block type="variables_get" id="33">'+
                                                                         '<field name="VAR">hall</field>'+
                                                                       '</block>'+
                                                                     '</value>'+
                                                                     '<value name="B">'+
                                                                       '<block type="io_highlow" id="34">'+
                                                                         '<field name="STATE">LOW</field>'+
                                                                       '</block>'+
                                                                     '</value>'+
                                                                   '</block>'+
                                                                 '</value>'+
                                                                 '<statement name="DO0">'+
                                                                   '<block type="io_digitalwrite" id="35">'+
                                                                     '<field name="PIN">4</field>'+
                                                                     '<value name="STATE">'+
                                                                       '<block type="io_highlow" id="36">'+
                                                                         '<field name="STATE">HIGH</field>'+
                                                                       '</block>'+
                                                                     '</value>'+
                                                                   '</block>'+
                                                                 '</statement>'+
                                                                 '<statement name="ELSE">'+
                                                                   '<block type="io_digitalwrite" id="37">'+
                                                                     '<field name="PIN">4</field>'+
                                                                     '<value name="STATE">'+
                                                                       '<block type="io_highlow" id="38">'+
                                                                         '<field name="STATE">LOW</field>'+
                                                                       '</block>'+
                                                                     '</value>'+
                                                                   '</block>'+
                                                                 '</statement>'+
                                                               '</block>'+
                                                             '</next>'+
                                                           '</block>'+
                                                         '</next>'+
                                                       '</block>'+
                                                     '</statement>'+
                                                   '</block>'+
                                                '</next>'+
                                               '</block>'+
                                             '</next>'+
                                           '</block>'+
                                          '</xml>';