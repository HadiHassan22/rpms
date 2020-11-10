package org.acme.travels.PD9;

import static org.acme.travels.Rules2E460E98FBDF296CF50748F35F942A65.*;
import org.acme.travels.*;
import org.acme.travels.Person;
import org.drools.modelcompiler.dsl.pattern.D;

@org.drools.compiler.kie.builder.MaterializedLambda()
public enum LambdaExtractorD96E873624F68CAEB1239CF63531014C implements org.drools.model.functions.Function1<org.acme.travels.Person, java.lang.Integer> {

    INSTANCE;

    public static final String EXPRESSION_HASH = "5304D0F915BA9118A48705AB560D2163";

    @Override()
    public java.lang.Integer apply(org.acme.travels.Person _this) {
        return _this.getAge();
    }
}
