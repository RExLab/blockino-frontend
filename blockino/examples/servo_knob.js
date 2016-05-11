'use strict';

var Blockino = Blockino || {};

Blockino.examples['../examples/servo_knob.js'] =  '<xml xmlns="http://www.w3.org/1999/xhtml">' + 
 '  <block type="variables_set" id="384" inline="true" x="31" y="136">' + 
 '    <field name="VAR">val</field>' + 
 '    <value name="VALUE">' + 
 '      <block type="io_analogread" id="393">' + 
 '        <field name="PIN">A0</field>' + 
 '      </block>' + 
 '    </value>' + 
 '    <next>' + 
 '      <block type="variables_set" id="397" inline="true">' + 
 '        <field name="VAR">val</field>' + 
 '        <value name="VALUE">' + 
 '          <block type="base_map" id="416" inline="true">' + 
 '            <value name="NUM">' + 
 '              <block type="variables_get" id="420">' + 
 '                <field name="VAR">val</field>' + 
 '              </block>' + 
 '            </value>' + 
 '            <value name="DMAX">' + 
 '              <block type="math_number" id="439">' + 
 '                <field name="NUM">180</field>' + 
 '              </block>' + 
 '            </value>' + 
 '          </block>' + 
 '        </value>' + 
 '        <next>' + 
 '          <block type="servo_write" id="370" inline="true">' + 
 '            <field name="SERVO_PIN">9</field>' + 
 '            <value name="SERVO_ANGLE">' + 
 '              <block type="variables_get" id="443">' + 
 '                <field name="VAR">val</field>' + 
 '              </block>' + 
 '            </value>' + 
 '            <next>' + 
 '              <block type="time_delay" id="450" inline="true">' + 
 '                <value name="DELAY_TIME_MILI">' + 
 '                  <block type="math_number" id="451">' + 
 '                    <field name="NUM">15</field>' + 
 '                  </block>' + 
 '                </value>' + 
 '              </block>' + 
 '            </next>' + 
 '          </block>' + 
 '        </next>' + 
 '      </block>' + 
 '    </next>' + 
 '  </block>' + 
 '</xml>';