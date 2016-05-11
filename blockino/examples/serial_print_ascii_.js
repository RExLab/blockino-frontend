'use strict';

var Blockino = Blockino || {};

Blockino.examples['../examples/serial_print_ascii_.js']='<xml>' + 
 '  <block type="serial_setup" id="9" x="314" y="68">' + 
 '    <field name="SERIAL_ID">Serial</field>' + 
 '    <field name="SPEED">9600</field>' + 
 '  </block>' + 
 '  <block type="variables_set" id="10" inline="true" x="40" y="125">' + 
 '    <field name="VAR">thisByte</field>' + 
 '    <value name="VALUE">' + 
 '      <block type="math_number" id="11">' + 
 '        <field name="NUM">33</field>' + 
 '      </block>' + 
 '    </value>' + 
 '    <next>' + 
 '      <block type="controls_whileUntil" id="12" inline="false">' + 
 '        <field name="MODE">WHILE</field>' + 
 '        <value name="BOOL">' + 
 '          <block type="logic_compare" id="13" inline="true">' + 
 '            <field name="OP">LT</field>' + 
 '            <value name="A">' + 
 '              <block type="variables_get" id="14">' + 
 '                <field name="VAR">thisByte</field>' + 
 '              </block>' + 
 '            </value>' + 
 '            <value name="B">' + 
 '              <block type="math_number" id="15">' + 
 '                <field name="NUM">126</field>' + 
 '              </block>' + 
 '            </value>' + 
 '          </block>' + 
 '        </value>' + 
 '        <statement name="DO">' + 
 '          <block type="serial_print" id="16" inline="true">' + 
 '            <field name="SERIAL_ID">Serial</field>' + 
 '            <field name="NEW_LINE">FALSE</field>' + 
 '            <value name="CONTENT">' + 
 '              <block type="variables_set_type" id="17" inline="true">' + 
 '                <field name="VARIABLE_SETTYPE_TYPE">CHARACTER</field>' + 
 '                <value name="VARIABLE_SETTYPE_INPUT">' + 
 '                  <block type="variables_get" id="18">' + 
 '                    <field name="VAR">thisByte</field>' + 
 '                  </block>' + 
 '                </value>' + 
 '              </block>' + 
 '            </value>' + 
 '            <next>' + 
 '              <block type="serial_print" id="19" inline="true">' + 
 '                <field name="SERIAL_ID">Serial</field>' + 
 '                <field name="NEW_LINE">FALSE</field>' + 
 '                <value name="CONTENT">' + 
 '                  <block type="text" id="20">' + 
 '                    <field name="TEXT">, dec: </field>' + 
 '                  </block>' + 
 '                </value>' + 
 '                <next>' + 
 '                  <block type="serial_print" id="21" inline="true">' + 
 '                    <field name="SERIAL_ID">Serial</field>' + 
 '                    <field name="NEW_LINE">TRUE</field>' + 
 '                    <value name="CONTENT">' + 
 '                      <block type="variables_set_type" id="22" inline="true">' + 
 '                        <field name="VARIABLE_SETTYPE_TYPE">INTEGER</field>' + 
 '                        <value name="VARIABLE_SETTYPE_INPUT">' + 
 '                          <block type="variables_get" id="23">' + 
 '                            <field name="VAR">thisByte</field>' + 
 '                          </block>' + 
 '                        </value>' + 
 '                      </block>' + 
 '                    </value>' + 
 '                    <next>' + 
 '                      <block type="math_change" id="24" inline="true">' + 
 '                        <field name="VAR">thisByte</field>' + 
 '                        <value name="DELTA">' + 
 '                          <block type="math_number" id="25">' + 
 '                            <field name="NUM">1</field>' + 
 '                          </block>' + 
 '                        </value>' + 
 '                      </block>' + 
 '                    </next>' + 
 '                  </block>' + 
 '                </next>' + 
 '              </block>' + 
 '            </next>' + 
 '          </block>' + 
 '        </statement>' + 
 '        <next>' + 
 '          <block type="infinite_loop" id="35"></block>' + 
 '        </next>' + 
 '      </block>' + 
 '    </next>' + 
 '  </block>' + 
 '</xml>';