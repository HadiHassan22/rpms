package org.acme.travels;

import org.drools.modelcompiler.dsl.pattern.D;
import org.drools.model.Index.ConstraintType;
import org.acme.travels.Person;

public class Rules2E460E98FBDF296CF50748F35F942A65 implements org.drools.model.Model {

    public final static java.time.format.DateTimeFormatter DATE_TIME_FORMATTER = java.time.format.DateTimeFormatter.ofPattern(org.drools.core.util.DateUtils.getDateFormatMask(),
                                                                                                                              java.util.Locale.ENGLISH);

    @Override
    public String getName() {
        return "org.acme.travels";
    }

    public static java.util.Date string_2_date(String s) {
        return java.util.GregorianCalendar.from(java.time.LocalDate.parse(s,
                                                                          DATE_TIME_FORMATTER).atStartOfDay(java.time.ZoneId.systemDefault()))
                                          .getTime();
    }

    @Override
    public java.util.List<org.drools.model.EntryPoint> getEntryPoints() {
        return java.util.Collections.emptyList();
    }

    @Override
    public java.util.List<org.drools.model.Global> getGlobals() {
        return globals;
    }

    @Override
    public java.util.List<org.drools.model.TypeMetaData> getTypeMetaDatas() {
        return typeMetaDatas;
    }

    java.util.List<org.drools.model.Global> globals = java.util.Collections.emptyList();

    java.util.List<org.drools.model.TypeMetaData> typeMetaDatas = java.util.Collections.emptyList();

    /**
     * With the following expression ID:
     * org.drools.modelcompiler.builder.generator.DRLIdGenerator@a2243db
     */
    @Override
    public java.util.List<org.drools.model.Rule> getRules() {
        return rules;
    }

    public java.util.List<org.drools.model.Rule> getRulesList() {
        return java.util.Arrays.asList(Rules2E460E98FBDF296CF50748F35F942A65RuleMethods0.rule_Is_32adult());
    }

    java.util.List<org.drools.model.Rule> rules = getRulesList();

    @Override
    public java.util.List<org.drools.model.Query> getQueries() {
        return java.util.Collections.emptyList();
    }
}
