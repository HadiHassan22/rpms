package org.drools.project.model;

import org.kie.kogito.rules.KieRuntimeBuilder;
import org.kie.kogito.rules.units.SessionData;
import org.kie.kogito.rules.units.SessionRuleUnitInstance;
import org.kie.kogito.rules.units.SessionUnit;

@org.springframework.stereotype.Component("defaultKieSession")
public class SessionRuleUnit_defaultKieSession extends SessionUnit {

    @org.springframework.beans.factory.annotation.Autowired()
    KieRuntimeBuilder runtimeBuilder;

    @Override
    public String id() {
        return "defaultKieSession";
    }

    @Override
    public SessionRuleUnitInstance createInstance(SessionData memory, String name) {
        return new SessionRuleUnitInstance(this, memory, runtimeBuilder.newKieSession("defaultKieSession"));
    }
}
