package org.drools.project.model;

import org.kie.kogito.rules.KieRuntimeBuilder;
import org.kie.kogito.rules.units.SessionData;
import org.kie.kogito.rules.units.SessionRuleUnitInstance;
import org.kie.kogito.rules.units.SessionUnit;

@org.springframework.stereotype.Component("defaultStatelessKieSession")
public class SessionRuleUnit_defaultStatelessKieSession extends SessionUnit {

    @org.springframework.beans.factory.annotation.Autowired()
    KieRuntimeBuilder runtimeBuilder;

    @Override
    public String id() {
        return "defaultStatelessKieSession";
    }

    @Override
    public SessionRuleUnitInstance createInstance(SessionData memory, String name) {
        return new SessionRuleUnitInstance(this, memory, runtimeBuilder.newKieSession("defaultStatelessKieSession"));
    }
}
